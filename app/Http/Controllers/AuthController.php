<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(LoginRequest $request): Response
    {
        $data = $request->validated();

        $admin = Admin::where('login', $data['login'])->first();

        if (!$admin || !Hash::check($data['password'], $admin->password)) {
            return response()->json([
                'message' => 'Login or password is incorrect.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $admin->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response(new AdminResource($admin))->withCookie($cookie);
    }

    public function logout(Request $request): Response
    {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response('ok')->withCookie($cookie);
    }

    public function user(Request $request): JsonResource
    {
        return new AdminResource($request->user());
    }
}
