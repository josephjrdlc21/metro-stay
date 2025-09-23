import { FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, Link, usePage, useForm, router } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import { statusBadgeClass, dateTime } from "@portal/utils/helper"

import MainLayout from "@portal/layouts/main-layout"
import AppNotification from "@portal/components/app-notification"
import AppPagination from "@portal/components/app-pagination"
import {Heading, Text, Breadcrumb, Flex, Separator,
    Card, Table, Menu, IconButton, Button, Box, HStack,
    Grid, Portal, Field, Input, NativeSelect, Status} from "@chakra-ui/react"
import { LuHouse, LuEllipsisVertical } from "react-icons/lu"
import { RiSearch2Line, RiResetRightLine, RiAddCircleLine} from "react-icons/ri"
import Swal from "sweetalert2"

interface Values {
    page_title: string
    keyword: string
    statuses: { [key: string]: string }
    selected_status: string
    start_date: string
    end_date: string
    record: {
        data: any[]
        links: any[]
        room_type: any[]
    }
}
interface PageProps extends InertiaPageProps{
    flash: any,
    values: Values
}

type FormValues = {
    keyword: string
    status: string
    start_date: string
    end_date: string
}

export default function RoomsIndex({ values }: { values: Values }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, processing, get } = useForm<FormValues>({
        keyword: values.keyword ?? '',
        status: values.selected_status ?? '',
        start_date: values.start_date ?? '',
        end_date: values.end_date ?? '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get(route('portal.rooms.index'));
    };

    const handleDeleteRoom = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to delete this room.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('portal.rooms.delete', id));
            }
        });
    }

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
                                    <Breadcrumb.CurrentLink>Rooms</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Card.Root size="sm" mt={5}>
                <Card.Body>
                    {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                    <form onSubmit={handleSubmit}>
                        <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} gap={3} mb={3} mt={flash.message ? 3 : 0}>
                            <Field.Root>
                                <Field.Label>Search</Field.Label>
                                <Input name="name" placeholder="e.g., Room Number" value={data.keyword} onChange={e => setData('keyword', e.target.value)}/>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>Status </Field.Label>
                                <NativeSelect.Root>
                                    <NativeSelect.Field placeholder="All" value={data.status} onChange={e => setData('status', e.target.value)}>
                                        {Object.entries(values.statuses).map(([value, label]) => (
                                            <option key={value} value={value}>
                                                {label as string}
                                            </option>
                                        ))}
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator />
                                </NativeSelect.Root>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>From</Field.Label>
                                <Input type="date" name="from" value={data.start_date} onChange={e => setData('start_date', e.target.value)}/>
                            </Field.Root>

                            <Field.Root>
                                <Field.Label>To</Field.Label>
                                <Input type="date" name="to" value={data.end_date} onChange={e => setData('end_date', e.target.value)}/>
                            </Field.Root>
                        </Grid>
                    
                        <HStack mb={2}>
                            <Button colorPalette="cyan" variant="solid" size="sm" type="submit" loading={processing}>
                                <RiSearch2Line /> Filter
                            </Button>
                            <Link href={route('portal.rooms.index')} disabled={processing}>
                                <Button colorPalette="gray" variant="solid" size="sm" disabled={processing}>
                                    <RiResetRightLine /> Clear
                                </Button>
                            </Link>
                        </HStack>
                    </form>

                    <Separator mt={2} mb={4}/>

                    <Flex justify="space-between" align="center" mb={3}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="lg">Room Records</Heading>
                        <HStack>
                            <Link href={route('portal.rooms.create')}>
                                <Button colorPalette="cyan" variant="solid" size="sm">
                                    <RiAddCircleLine /> Add Room
                                </Button>
                            </Link>
                        </HStack>
                    </Flex>

                    <Box display="block" overflowX="auto" width="100%">
                        <Table.Root variant="outline">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader minW="200px">Room</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Type</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Created At</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center" minW="80px">Action</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {values?.record?.data && values?.record?.data.length > 0 ? (
                                    (values?.record?.data.map)(room => (
                                        <Table.Row key={room.id}>
                                            <Table.Cell>
                                                <Text fontSize="sm" color="blue.500">{room.room_number}</Text>
                                            </Table.Cell>
                                            <Table.Cell>{room.room_type.name}</Table.Cell>
                                            <Table.Cell>
                                                <Status.Root colorPalette={statusBadgeClass(room.status)}>
                                                    <Status.Indicator />
                                                    {room.status}
                                                </Status.Root>
                                            </Table.Cell>
                                            <Table.Cell>{dateTime(room.created_at)}</Table.Cell>
                                            <Table.Cell textAlign="center">
                                                <Menu.Root>
                                                    <Menu.Trigger asChild _focus={{ boxShadow: "none", outline: "none" }} _active={{ bg: "transparent" }}>
                                                        <IconButton aria-label="action" size="sm" variant="plain">
                                                            <LuEllipsisVertical />
                                                        </IconButton>
                                                    </Menu.Trigger>
                                                    <Portal>
                                                        <Menu.Positioner>
                                                            <Menu.Content>
                                                                <Menu.Item cursor="pointer" value="edit">
                                                                    <Link href={route('portal.rooms.edit', room.id)} style={{ border: "0px", outline: "none", boxShadow: "none", textDecoration: "none", color: "inherit"}}>
                                                                        Edit Details
                                                                    </Link>
                                                                </Menu.Item>
                                                                <Menu.Item cursor="pointer" value="delete" onClick={() => {
                                                                    setTimeout(() => handleDeleteRoom(room.id), 0);
                                                                }}>
                                                                    Delete Room
                                                                </Menu.Item>
                                                            </Menu.Content>
                                                        </Menu.Positioner>
                                                    </Portal>
                                                </Menu.Root>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={6} textAlign="center">No Record Found.</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                    <Separator />
                    <Box overflowX="auto" mt={4}>
                        <AppPagination links = {values.record.links} />
                    </Box>
                </Card.Body>
            </Card.Root>
        </MainLayout>
    );
}