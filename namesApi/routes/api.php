<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NamesController;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('names', [NamesController::class, 'index']);
Route::post('names', [NamesController::class, 'store']);
Route::get('names/{id}', [NamesController::class, 'show']);
Route::get('names/{id}/edit', [NamesController::class, 'edit']);
Route::put('names/{id}/edit', [NamesController::class, 'update']);
Route::delete('names/{id}/delete', [NamesController::class, 'destroy']);
