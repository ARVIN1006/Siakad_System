<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    /**
     * Configure the rate limiters for the application.
     * Protects against DDoS and brute-force attacks.
     */
    protected function configureRateLimiting(): void
    {
        // Global API rate limit: 60 requests per minute per authenticated user or IP
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)
                ->by($request->user()?->id ?: $request->ip())
                ->response(function () {
                    return response()->json([
                        'success' => false,
                        'message' => 'Terlalu banyak permintaan. Silakan coba lagi nanti.',
                    ], 429);
                });
        });

        // Strict login rate limit: 5 attempts per minute per IP + username combination
        // Protects against brute-force and credential stuffing attacks
        RateLimiter::for('login', function (Request $request) {
            $key = strtolower((string) $request->input('username')) . '|' . $request->ip();

            return Limit::perMinute(5)
                ->by($key)
                ->response(function () {
                    return response()->json([
                        'success' => false,
                        'message' => 'Terlalu banyak percobaan login. Silakan coba lagi dalam 1 menit.',
                    ], 429);
                });
        });
    }
}
