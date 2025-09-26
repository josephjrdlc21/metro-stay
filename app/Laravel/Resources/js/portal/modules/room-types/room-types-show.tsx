import { useRoute } from "@ziggy"

import { Head, Link } from "@inertiajs/react"

import { priceFormat, quantityFormat } from "@portal/utils/helper"

import MainLayout from "@portal/layouts/main-layout"
import {Box, Button, Card, Text, Heading, Separator, Image, Stack, RatingGroup,
    Breadcrumb, Flex, SimpleGrid, Container, Status, Badge } from "@chakra-ui/react"
import { LuHouse, LuArrowLeftFromLine } from "react-icons/lu"

interface Values {
    page_title: string,
    room_type: {
        id: number,
        name: string,
        bed_type: string,
        capacity: string | number,
        price: string | number,
        description: string,
        amenities: string[],
        created_at: string,
        updated_at: string,
        directory: string,
        filename: string,
    }
}

export default function RoomTypesShow({ values }: { values: Values }){
    const route = useRoute();

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Room Types</Heading>
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
                                    <Breadcrumb.Link href="#">Room Types</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Show Room Type</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Container maxW="4xl" mt={4} style={{padding: "0px"}}>
                <Card.Root size="sm">
                    <Card.Header pb={2}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Show room type details</Heading>
                    </Card.Header>
                    <Separator mt={2} mb={2} />
                    <Card.Body>
                        <Image
                            rounded="md"
                            shadow="sm"
                            height="350px"
                            src={`${values.room_type.directory}/${values.room_type.filename}`}
                        />
                        <Flex justify="space-between" mt={3}>
                            <Text fontWeight="semibold">{values.room_type.name} | {values.room_type.bed_type}</Text>
                            <Text fontWeight="semibold">₱ {priceFormat(values.room_type.price)}</Text>
                        </Flex>

                        <Stack direction="row" mt={2}>
                            {values.room_type.amenities.map((item, index) => (
                                <Badge key={index}>{item}</Badge>
                            ))}
                        </Stack>
                        <Stack direction="row" mt={2}>
                            <Badge>Max Guest {quantityFormat(values.room_type.capacity)}</Badge>
                        </Stack>

                        <Text textAlign="justify" mt={4}>{values.room_type.description}</Text>

                        <Flex gap={2} mt={4} align="center">
                            <RatingGroup.Root count={5} defaultValue={3} size="sm" colorPalette="orange">
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                            <Text textStyle="xs">200+ reviews</Text>
                        </Flex>
                    </Card.Body>
                    <Separator mt={4} mb={2} />
                    <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                        <Link href={route('portal.room_types.index')}>
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