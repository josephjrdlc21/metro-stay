import MainLayout from "@portal/layouts/main-layout"
import { Card } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Breadcrumb } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { AiOutlineBank } from "react-icons/ai"
import { Head } from "@inertiajs/react"

export default function Index({ values }: { values: any }){
    return (
        <MainLayout>
            <Head title={values.page_title}/>
            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify="space-between" align="center">
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Dashboard</Heading>
                        <Breadcrumb.Root>
                            <Breadcrumb.List>
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">
                                        <Icon boxSize={4} as={AiOutlineBank} color="cyan.700" />
                                    </Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
                                </Breadcrumb.Item>  
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Data</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>


        </MainLayout>
    )
}