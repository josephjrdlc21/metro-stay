import { FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, useForm, usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import { statusBadgeClass, dateTime, quantityFormat, priceFormat } from "@web/utils/helper"

import MainLayout from "@web/layouts/main-layout"
import AppNotification from "@web/components/app-notification"
import AppPagination from "@web/components/app-pagination"
import { Heading, Text, Box, Link, Grid, Field, Input, HStack, Separator,
    Button, Status, Table, Portal, Menu, IconButton} from "@chakra-ui/react"

import { RiSearch2Line, RiResetRightLine} from "react-icons/ri"
import { LuEllipsisVertical } from "react-icons/lu"

interface PageProps extends InertiaPageProps{
    flash: any,
}

interface Values {
    page_title: string,
    keyword: string
    record: {
        data: any[],
        links: any[],
    }
}

type FormValues = {
    keyword: string
}

export default function BookingsIndex({ values }: { values: Values }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, processing, get } = useForm<FormValues>({
        keyword: values.keyword ?? ''
    });
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get(route('web.bookings.index'));
    };

    return(
        <MainLayout>
            <Head title={values.page_title}/>
            <Box mt={10}>
                <Heading size="4xl">Bookings</Heading>
                <Text color="gray.500" my={4}>Manage your reservations with ease. View, or create new bookings to plan your stay with us.</Text>
            </Box>
            {flash.message && <AppNotification status={flash.status} title={flash.message}/>}

            <form onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(1, 1fr)" }} gap={3} mb={3} mt={2}>
                    <Field.Root>
                        <Field.Label>Search</Field.Label>
                        <Input name="name" placeholder="e.g., Ref No." value={data.keyword} onChange={e => setData('keyword', e.target.value)}/>
                    </Field.Root>
                </Grid>

                <HStack>
                    <Button colorPalette="cyan" variant="solid" size="sm" type="submit" loading={processing}>
                        <RiSearch2Line /> Filter
                    </Button>
                    {processing ? (
                        <Button colorPalette="gray" variant="solid" size="sm" disabled>
                            <RiResetRightLine /> Clear
                        </Button>
                    ) : (
                        <Link href={route("web.hotels.index")}>
                            <Button colorPalette="gray" variant="solid" size="sm">
                                <RiResetRightLine /> Clear
                            </Button>
                        </Link>
                    )}
                </HStack>
            </form>

            <Box display="block" overflowX="auto" width="100%" mt={10}>
                <Table.Root variant="outline">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader minW="200px">Ref No.</Table.ColumnHeader>
                            <Table.ColumnHeader minW="200px">Room Type</Table.ColumnHeader>
                            <Table.ColumnHeader minW="200px" textAlign="center">Room No.</Table.ColumnHeader>
                            <Table.ColumnHeader minW="100px">Status</Table.ColumnHeader>
                            <Table.ColumnHeader minW="80px" textAlign="center">Guest</Table.ColumnHeader>
                            <Table.ColumnHeader minW="100px" textAlign="right">Amount</Table.ColumnHeader>
                            <Table.ColumnHeader minW="200px">Booking Date</Table.ColumnHeader>
                            <Table.ColumnHeader minW="80px" textAlign="center">Action</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {values?.record?.data && values?.record?.data.length > 0 ? (
                            (values?.record?.data.map)(booking => (
                                <Table.Row key={booking.id}>
                                    <Table.Cell>
                                        <Text fontSize="sm" color="blue.500">{booking.ref_no}</Text>
                                    </Table.Cell>
                                    <Table.Cell>{booking.room_type_name}</Table.Cell>
                                    <Table.Cell textAlign="center">{booking.room_number}</Table.Cell>
                                    <Table.Cell>
                                        <Status.Root colorPalette={statusBadgeClass(booking.status)}>
                                            <Status.Indicator />
                                            {booking.status}
                                        </Status.Root>
                                    </Table.Cell>
                                    <Table.Cell textAlign="center">{quantityFormat(booking.guest)}</Table.Cell>
                                    <Table.Cell textAlign="right">₱ {priceFormat(booking.total_amount)}</Table.Cell>
                                    <Table.Cell>{dateTime(booking.created_at)}</Table.Cell>
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
                                                            <Link href="" style={{ border: "0px", outline: "none", boxShadow: "none", textDecoration: "none", color: "inherit"}}>
                                                                Pay Booking
                                                            </Link>
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
                                <Table.Cell colSpan={8} textAlign="center">No Record Found.</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Root>
            </Box>
            <Separator />
            <Box overflowX="auto" mt={4}>
                <AppPagination links = {values.record.links} />
            </Box>
        </MainLayout>
    );
}