import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'app/Laravel/Resources/js/web/app.tsx',
                'app/Laravel/Resources/js/portal/portal.tsx'
            ],
            refresh: true,
        }),
        react(),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@web': path.resolve(__dirname, 'app/Laravel/Resources/js/web'),
            '@portal': path.resolve(__dirname, 'app/Laravel/Resources/js/portal'),
            '@ziggy': path.resolve(__dirname, 'vendor/tightenco/ziggy/src/js'),
        },
    },
})