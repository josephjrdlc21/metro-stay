import './bootstrap';
import { Provider } from "@/components/ui/provider"
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('/app/Laravel/Resources/js/web/**/*.tsx', { eager: true })
        return pages[`/app/Laravel/Resources/js/web/${name}.tsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(
            <Provider>
                <App {...props} />
            </Provider>
        )
    },
    progress: {
        color: '#374151',
    },
})