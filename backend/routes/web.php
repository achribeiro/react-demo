<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'message' => 'Laravel API Backend',
        'version' => '1.0.0',
        'endpoints' => [
            'users' => '/api/users',
            'stats' => '/api/users/stats',
        ],
    ]);
});


