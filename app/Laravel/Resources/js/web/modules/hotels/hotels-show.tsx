import { useRoute } from "@ziggy"

import { Head, Link } from "@inertiajs/react"

import { priceFormat, quantityFormat } from "@web/utils/helper"

import MainLayout from "@web/layouts/main-layout"
import { Button, Card, Text, Heading, Image, Stack, RatingGroup,
    Field, Flex, Grid, Badge, Box, Input } from "@chakra-ui/react"

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

export default function HotelsShow({ values }: { values: Values }){
    const route = useRoute();

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Box mt={10}>
                <Heading size="4xl">Hotel Rooms</Heading>
                <Text color="gray.500" my={4}>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</Text>
            </Box>

            <Image
                rounded="md"
                shadow="sm"
                width="full"
                height={{ base: "200px", md: "400px", lg: "600px",}}
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

            <Card.Root size="sm" mt={10}>
                <Card.Body>
                    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} gap={3} mb={3}>
                        <Field.Root>
                            <Field.Label>Check In</Field.Label>
                            <Input type="date" name="check_in"/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Check Out</Field.Label>
                            <Input type="date" name="check_out"/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Guest</Field.Label>
                            <Input type="number" min="0" max="50" name="guest" placeholder="0"/>
                        </Field.Root>
                        <Field.Root>
                            <Field.Label>Booking</Field.Label>
                            <Button w="full">Book Now</Button>
                        </Field.Root>
                    </Grid>
                </Card.Body>
            </Card.Root>
        </MainLayout>
    );
}