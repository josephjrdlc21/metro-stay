import { Button, HStack } from "@chakra-ui/react"

export default function Index({ data }: { data: any }){
    let word: string = "Hello Worlds";

    return (
        <HStack>
            <Button>{word}</Button>
            <Button>{data.page_title}</Button>
            <Button>{data.result}</Button>
        </HStack> 
    )
}