
export default function Index({ data }: { data: any }){
    let word: string = "Hello Worlds";

    return (
        <>
            <h1>{word}</h1>
            <h1>{data.page_title}</h1>
            <h1>{data.result}</h1>
        </>
    )
}