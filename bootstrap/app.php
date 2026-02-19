<?php

use App\Http\Middleware\SecurityHeadersMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Apply security headers to all responses globally
        $middleware->append(SecurityHeadersMiddleware::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Safe, structured JSON error responses that don't expose internals
        $exceptions->render(function (\Throwable $e, Request $request) {
            if ($request->is('api/*') || $request->expectsJson()) {
                $status = 500;
                $message = 'Terjadi kesalahan pada server.';

                if ($e instanceof ThrottleRequestsException) {
                    $retryAfter = $e->getHeaders()['Retry-After'] ?? 60;
                    return response()->json([
                        'success' => false,
                        'message' => "Terlalu banyak permintaan. Coba lagi dalam {$retryAfter} detik.",
                    ], 429, ['Retry-After' => $retryAfter]);
                } elseif ($e instanceof NotFoundHttpException) {
                    $status = 404;
                    $message = 'Resource tidak ditemukan.';
                } elseif ($e instanceof MethodNotAllowedHttpException) {
                    $status = 405;
                    $message = 'Method HTTP tidak diizinkan.';
                } elseif ($e instanceof HttpException) {
                    $status = $e->getStatusCode();
                    $message = $e->getMessage() ?: 'Terjadi kesalahan HTTP.';
                } elseif ($e instanceof \Illuminate\Auth\AuthenticationException) {
                    $status = 401;
                    $message = 'Tidak terautentikasi. Silakan login terlebih dahulu.';
                } elseif ($e instanceof \Illuminate\Auth\Access\AuthorizationException) {
                    $status = 403;
                    $message = 'Akses ditolak.';
                } elseif ($e instanceof \Illuminate\Validation\ValidationException) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Data yang diberikan tidak valid.',
                        'errors'  => $e->errors(),
                    ], 422);
                }

                return response()->json([
                    'success' => false,
                    'message' => $message,
                    // Only expose debug detail in local environment
                    'debug'   => app()->environment('local') ? $e->getMessage() : null,
                ], $status);
            }
        });
    })->create();