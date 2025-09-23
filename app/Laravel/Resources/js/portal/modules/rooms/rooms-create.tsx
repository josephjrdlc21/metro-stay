import { FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, Link, usePage, useForm } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import MainLayout from "@portal/layouts/main-layout"
import AppNotification from "@portal/components/app-notification"
import {Box, Button, Card, Text, Heading, Separator,
    Breadcrumb, Flex, Stack, Container, Field, Input,
    NativeSelect} from "@chakra-ui/react"
import { FaTimes, FaRegPaperPlane  } from "react-icons/fa"
import { LuHouse } from "react-icons/lu"

interface Values {
    page_title: string,
    bed_types: { [key: string | number]: string }
    statuses: { [key: string]: string }
}
interface PageProps extends InertiaPageProps{
    flash: any
}

type FormValues = {
    bed_type: string | number
    room_number: string | number
    status: string
}

export default function RoomsCreate({ values }: { values: Values }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm<FormValues>({
        bed_type: '',
        room_number: '',
        status: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('portal.rooms.create'))
    };

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Rooms</Heading>
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
                                    <Breadcrumb.Link href="#">Rooms</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Create Room</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Container maxW="3xl" mt={4} style={{padding: "0px"}}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Card.Root size="sm">
                        <Card.Header pb={2}>
                            <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Create room form</Heading>
                            <Text _dark={{ color: "gray.500" }} color="gray.500" textStyle="xs">Fill up the ( * ) required fields before submitting the form.</Text>
                            {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                        </Card.Header>
                        <Separator mt={2} mb={2} />
                        <Card.Body>
                            <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Room Details</Heading>
                            <Stack gap={4} mt={4}>
                                <Field.Root orientation="horizontal" invalid={!!errors.room_number}>
                                    <Field.Label>Room No. <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="0" min="0" max="1000" type="number" value={data.room_number} onChange={e => setData('room_number', e.target.value)} flex="1"/>
                                        {errors.room_number && <Field.ErrorText>{errors.room_number}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.bed_type}>
                                    <Field.Label>Bed Type <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <NativeSelect.Root>
                                            <NativeSelect.Field placeholder="Select Bed Type" value={data.bed_type} onChange={e => setData('bed_type', e.target.value)}>
                                                {Object.entries(values.bed_types).map(([value, label]) => (
                                                    <option key={value} value={value}>
                                                        {label as string}
                                                    </option>
                                                ))}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        {errors.bed_type && <Field.ErrorText>{errors.bed_type}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.status}>
                                    <Field.Label>Status <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <NativeSelect.Root>
                                            <NativeSelect.Field placeholder="Select Status" value={data.status} onChange={e => setData('status', e.target.value)}>
                                                {Object.entries(values.statuses).map(([value, label]) => (
                                                    <option key={value} value={value}>
                                                        {label as string}
                                                    </option>
                                                ))}
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                        {errors.status && <Field.ErrorText>{errors.status}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>
                            </Stack>
                        </Card.Body>
                        <Separator mt={4} mb={2} />
                        <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                            <Link href={route('portal.rooms.index')} disabled={processing}>
                                <Button variant="solid" colorPalette="red" size="sm" disabled={processing}>
                                    <FaTimes/> Cancel
                                </Button>
                            </Link>
                            <Button type="submit" variant="solid" colorPalette="cyan" size="sm" loading={processing}>
                                <FaRegPaperPlane/>  Submit
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </form>
            </Container>
        </MainLayout>
    );
}