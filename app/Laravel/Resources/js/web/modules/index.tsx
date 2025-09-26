import { Head } from "@inertiajs/react"

import MainLayout from "@web/layouts/main-layout"
interface Values {
    page_title: string,
}

export default function Index({ values }: { values: Values }){

    return (
        <MainLayout>
            <Head title={values.page_title}/>
            
        </MainLayout>
    )
}