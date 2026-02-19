<?php

return [

    /*
     |--------------------------------------------------------------------------
     | Cross-Origin Resource Sharing (CORS) Configuration
     |--------------------------------------------------------------------------
     |
     | Configure CORS settings carefully. Only allow origins, methods, and
     | headers that are strictly necessary for your application to function.
     | Set CORS_ALLOWED_ORIGINS in .env to your actual frontend domain(s).
     |
     | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
     |
     */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Explicitly list allowed HTTP methods instead of wildcard
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    // Default to localhost only - MUST be overridden via CORS_ALLOWED_ORIGINS
    // in .env for production (e.g., https://your-frontend-domain.com)
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'http://localhost')),

    'allowed_origins_patterns' => [],

    // Only allow headers that your API actually uses
    'allowed_headers' => ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'X-XSRF-TOKEN'],

    'exposed_headers' => ['Retry-After'],

    'max_age' => 3600,

    'supports_credentials' => true,

];