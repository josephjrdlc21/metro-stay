import { FormEvent, ChangeEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, Link, usePage, useForm } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import MainLayout from "@portal/layouts/main-layout"
import AppNotification from "@portal/components/app-notification"
import {Box, Button, Card, Text, Heading, Separator, Textarea, FileUpload,
    Breadcrumb, Flex, Stack, Container, Field, Input, Icon } from "@chakra-ui/react"
import { FaTimes, FaRegPaperPlane  } from "react-icons/fa"
import { LuHouse, LuUpload  } from "react-icons/lu"

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
interface PageProps extends InertiaPageProps{
    flash: any
}

type FormValues = {
    name: string,
    bed_type: string,
    capacity: string | number,
    price: string | number,
    amenities: string[],
    description: string,
    image: File | null,
}

export default function RoomTypesEdit({ values }: { values: Values }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm<FormValues>({
        name: values.room_type.name ?? '',
        bed_type: values.room_type.bed_type ?? '',
        capacity: values.room_type.capacity ?? '',
        price: values.room_type.price ?? '',
        amenities: values.room_type.amenities ?? '',
        description: values.room_type.description ?? '',
        image: null,
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('portal.room_types.edit', values.room_type.id))
    };

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
                                    <Breadcrumb.CurrentLink>Edit Room Type</Breadcrumb.CurrentLink>
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
                            <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Edit room type form</Heading>
                            <Text _dark={{ color: "gray.500" }} color="gray.500" textStyle="xs">Fill up the ( * ) required fields before submitting the form.</Text>
                            {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                        </Card.Header>
                        <Separator mt={2} mb={2} />
                        <Card.Body>
                            <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Room Details</Heading>
                            <Stack gap={4} mt={4}>
                                <Field.Root orientation="horizontal" invalid={!!errors.name}>
                                    <Field.Label>Name <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="Standard, Deluxe, Twin" value={data.name} onChange={e => setData('name', e.target.value)} flex="1"/>
                                        {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.bed_type}>
                                <Field.Label>Bed type <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="Queen Bed, King Bed, Single Bed" value={data.bed_type} onChange={e => setData('bed_type', e.target.value)} flex="1"/>
                                        {errors.bed_type && <Field.ErrorText>{errors.bed_type}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.capacity}>
                                <Field.Label>Capacity <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="0" min="0" max="50" type="number" value={data.capacity}  onChange={e => setData('capacity', e.target.value)} flex="1"/>
                                        {errors.capacity && <Field.ErrorText>{errors.capacity}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.price}>
                                <Field.Label>Price <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="0.00" min="0" max="30000" type="number" step="0.01" value={data.price}  onChange={e => setData('price', e.target.value)} flex="1"/>
                                        {errors.price && <Field.ErrorText>{errors.price}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.amenities}>
                                <Field.Label>Amenities <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="TV, Pool, WiFi" value={(data.amenities ?? []).join(", ")}  onChange={e => setData('amenities', e.target.value.split(",").map(item => item.trim()))} flex="1"/>
                                        {errors.amenities && <Field.ErrorText>{errors.amenities}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.description}>
                                <Field.Label>Description <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Textarea size="sm" placeholder="Description" value={data.description}  onChange={e => setData('description', e.target.value)}  flex="1"/>
                                        {errors.description && <Field.ErrorText>{errors.description}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <FileUpload.Root alignItems="stretch" maxFiles={1}>
                                    <FileUpload.HiddenInput
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            if (e.target.files && e.target.files[0]) {
                                                setData('image', e.target.files[0]);
                                            }
                                        }}
                                    />
                                    <FileUpload.Dropzone>
                                        <Icon size="md" color="fg.muted">
                                            <LuUpload />
                                        </Icon>
                                        <FileUpload.DropzoneContent>
                                            <Box>Drag and drop new room image here</Box>
                                            <Box color="fg.muted">.png, .jpg up to 2MB</Box>
                                        </FileUpload.DropzoneContent>
                                    </FileUpload.Dropzone>
                                    <FileUpload.List />
                                </FileUpload.Root>
                                {errors.image && <Text textStyle="xs" color="red.500">{errors.image}</Text>}
                            </Stack>
                        </Card.Body>
                        <Separator mt={4} mb={2} />
                        <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                            <Link href={route('portal.room_types.index')} disabled={processing}>
                                <Button variant="solid" colorPalette="red" size="sm" disabled={processing}>
                                    <FaTimes/> Cancel
                                </Button>
                            </Link>
                            <Button type="submit" variant="solid" colorPalette="cyan" size="sm" loading={processing}>
                                <FaRegPaperPlane/>  Save
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </form>
            </Container>
        </MainLayout>
    );
}