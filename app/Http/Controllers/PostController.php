<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StorePostRequest;


class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->get();
        $now = now();

        return Inertia::render('Posts/Index', [
            'posts' => PostResource::collection($posts),
            'now' => $now
        ]);
    }

    public function store(StorePostRequest $request)
    {
        // dd($request->All());
        Auth::user()->posts()->create(
            $request->validated()
        );

        return redirect()->route('posts.index')
            ->with('success', 'Post created successfully.');
    }
}
