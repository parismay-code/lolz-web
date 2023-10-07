<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentRequest;
use App\Http\Resources\CommentResource;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CommentsController extends Controller
{
    public function get(Request $request, Article $article): Response
    {
        $comments = $article->comments()->orderByDesc('created_at')->get();

        return response(CommentResource::collection($comments));
    }

    public function create(CommentRequest $request, Article $article): Response
    {
        $data = $request->validated();

        $comment = $article->comments()->create($data);

        return response(new CommentResource($comment));
    }

    public function delete(Request $request, Article $article, Comment $comment): Response
    {
        $comment->delete();

        return response('ok');
    }
}
