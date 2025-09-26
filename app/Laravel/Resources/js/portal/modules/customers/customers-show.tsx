import { useRoute } from "@ziggy"

import { Head, Link} from "@inertiajs/react"

import { statusBadgeClass, dateTime, formatId } from "@portal/utils/helper"

import MainLayout from "@portal/layouts/main-layout"
import {Box, Button, Card, Text, Heading, Separator, Avatar,
    Breadcrumb, Flex, SimpleGrid, Container, Status} from "@chakra-ui/react"
import { LuHouse, LuArrowLeftFromLine } from "react-icons/lu"

interface Values {
    page_title: string,
    customer: {
        id: number,
        name: string,
        email: string,
        phone_number: string,
        status: string,
        created_at: string,
        updated_at: string,
        directory: string,
        filename: string,
    }
}

export default function CustomersShow({ values }: { values: Values }){
    const route = useRoute();

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Customers</Heading>
                        <Breadcrumb.Root>
                            <Breadcrumb.List>
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">
                                        <LuHouse />
                                    </Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
                                </Breadcrumb.Item>  
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">Customers</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Show Customer</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Container maxW="xl" mt={4} style={{padding: "0px"}}>
                <Card.Root size="sm">
                    <Card.Header pb={2}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Show customer details</Heading>
                    </Card.Header>
                    <Separator mt={2} mb={2} />
                    <Card.Body>
                        <Flex justify="center" mb={6}>
                            <Box h="100px" w="100px">
                                <Avatar.Root size="full">
                                    <Avatar.Fallback name={values.customer.name} />
                                    <Avatar.Image src={`${values.customer.directory}/${values.customer.filename}`}/>
                                </Avatar.Root>
                            </Box>
                        </Flex>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold">ID No.</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{formatId(values.customer.id)}</Text>

                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Phone No.</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.customer.phone_number}</Text>

                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Created At</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{dateTime(values.customer.created_at)}</Text>

                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Update At</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{dateTime(values.customer.updated_at)}</Text>
                            </Box>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold">Name</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.customer.name}</Text>

                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Email</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.customer.email}</Text>

                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Status</Text>
                                <Status.Root colorPalette={statusBadgeClass(values.customer.status)}>
                                    <Status.Indicator />
                                    {values.customer.status}
                                </Status.Root>
                            </Box>
                        </SimpleGrid>
                    </Card.Body>
                    <Separator mt={4} mb={2} />
                    <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                        <Link href={route('portal.customers.index')}>
                            <Button variant="solid" size="sm">
                                <LuArrowLeftFromLine/> Go Back
                            </Button>
                        </Link>
                    </Card.Footer>
                </Card.Root> 
            </Container>
        </MainLayout>
    );
}