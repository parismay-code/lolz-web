<?php

use App\Http\Controllers\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::get('/articles', [ArticlesController::class, 'getAll']);
Route::get('/articles/{article}', [ArticlesController::class, 'get']);

Route::get('/articles/{article}/comments', [CommentsController::class, 'get']);
Route::post('/articles/{article}/comments', [CommentsController::class, 'create']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    Route::post('/articles', [ArticlesController::class, 'create']);
    Route::put('/articles/{article}', [ArticlesController::class, 'update']);
    Route::delete('/articles/{article}', [ArticlesController::class, 'delete']);

    Route::delete('/articles/{article}/comments/{comment}', [CommentsController::class, 'delete']);
});
