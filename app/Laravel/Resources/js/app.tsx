import './bootstrap.js';
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('/app/Laravel/Resources/js/**/*.tsx', { eager: true })
        return pages[`/app/Laravel/Resources/js/${name}.tsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
})
