<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArticleRequest;
use App\Http\Resources\ArticleCollection;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ArticlesController extends Controller
{
    public function getAll(Request $request): Response
    {
        return response(new ArticleCollection(Article::orderByDesc('created_at')->paginate(8)));
    }

    public function get(Request $request, Article $article): Response
    {
        return response(new ArticleResource($article));
    }

    public function create(ArticleRequest $request): Response
    {
        $data = $request->validated();

        $article = $request->user()->articles()->create($data);

        return response(new ArticleResource($article));
    }

    public function update(ArticleRequest $request, Article $article): Response
    {
        $data = $request->validated();

        $article->update($data);

        return response($article);
    }

    public function delete(Request $request, Article $article): Response
    {
        $article->delete();

        return response('ok');
    }
}
