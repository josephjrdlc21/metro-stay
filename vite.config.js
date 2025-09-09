import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['app/Laravel/Resources/js/app.tsx'],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@ziggy': path.resolve(__dirname, 'vendor/tightenco/ziggy/src/js'),
        },
    },
});
