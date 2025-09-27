import { useEffect, useState, FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, usePage, useForm } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import { priceFormat, quantityFormat } from "@web/utils/helper"

import MainLayout from "@web/layouts/main-layout"
import AppNotification from "@web/components/app-notification"
import { Button, Card, Text, Heading, Image, Stack, RatingGroup,
    Field, Flex, Grid, Badge, Box, Input } from "@chakra-ui/react"

interface PageProps extends InertiaPageProps{
    flash: any
}

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

type FormValues = {
    check_in: string
    check_out: string
    guest: string | number
}

export default function HotelsBook({ values }: { values: Values }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm<FormValues>({
        check_in: '',
        check_out: '',
        guest: '',
    });
    const [today, setToday] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('web.hotels.book', values.room_type.id))
    };

    useEffect(() => {
        const now = new Date();
        const formatted = now.toISOString().split("T")[0];

        setToday(formatted);
    }, []);

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
                    <form onSubmit={handleSubmit}>
                        {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                        <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} gap={3} mb={3} mt={1}>
                            <Field.Root invalid={!!errors.check_in}>
                                <Field.Label>Check In</Field.Label>
                                <Input type="date" name="check_in" min={today} value={data.check_in} onChange={e => setData('check_in', e.target.value)}/>
                                {errors.check_in && <Field.ErrorText>{errors.check_in}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root invalid={!!errors.check_out}>
                                <Field.Label>Check Out</Field.Label>
                                <Input type="date" name="check_out" min={today} value={data.check_out} onChange={e => setData('check_out', e.target.value)}/>
                                {errors.check_out && <Field.ErrorText>{errors.check_out}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root invalid={!!errors.guest}>
                                <Field.Label>Guest</Field.Label>
                                <Input type="number" min="0" max="50" name="guest" placeholder="0" value={data.guest} onChange={e => setData('guest', e.target.value)}/>
                                {errors.guest && <Field.ErrorText>{errors.guest}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Booking</Field.Label>
                                <Button w="full" type="submit" loading={processing}>Book Now</Button>
                            </Field.Root>
                        </Grid>
                    </form>
                </Card.Body>
            </Card.Root>
        </MainLayout>
    );
}