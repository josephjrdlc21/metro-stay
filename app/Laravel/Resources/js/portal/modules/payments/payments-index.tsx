import { FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, useForm, usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import { statusBadgeClass, dateTime, quantityFormat, priceFormat } from "@portal/utils/helper"

import MainLayout from "@portal/layouts/main-layout"
import AppNotification from "@portal/components/app-notification"
import AppPagination from "@portal/components/app-pagination"
import { Heading, Text, Box, Link, Grid, Field, Input, HStack, Separator,
    Button, Status, Table, Portal, Menu, IconButton, NativeSelect, Card,
    Breadcrumb, Flex} from "@chakra-ui/react"

import { RiSearch2Line, RiResetRightLine} from "react-icons/ri"
import { LuEllipsisVertical, LuHouse } from "react-icons/lu"

interface PageProps extends InertiaPageProps{
    flash: any,
}

interface Values {
    page_title: string,
    keyword: string,
    statuses: { [key: string]: string }
    selected_status: string,
    start_date: string,
    end_date: string,
    record: {
        data: any[],
        links: any[],
    }
}

type FormValues = {
    keyword: string
    status: string
    start_date: string
    end_date: string
}

export default function PaymentsIndex({ values }: { values: Values }){
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

        get(route('portal.payments.index'));
    };

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Payments</Heading>
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
                                    <Breadcrumb.CurrentLink>Payments</Breadcrumb.CurrentLink>
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
                                <Input name="name" placeholder="e.g., Ref No." value={data.keyword} onChange={e => setData('keyword', e.target.value)}/>
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

                        <HStack>
                            <Button colorPalette="cyan" variant="solid" size="sm" type="submit" loading={processing}>
                                <RiSearch2Line /> Filter
                            </Button>
                            {processing ? (
                                <Button colorPalette="gray" variant="solid" size="sm" disabled>
                                    <RiResetRightLine /> Clear
                                </Button>
                            ) : (
                                <Link href={route("portal.payments.index")}>
                                    <Button colorPalette="gray" variant="solid" size="sm">
                                        <RiResetRightLine /> Clear
                                    </Button>
                                </Link>
                            )}
                        </HStack>
                    </form>

                    <Separator mt={2} mb={4}/>

                    <Flex justify="space-between" align="center" mb={3}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="lg">Payments Records</Heading>
                        <HStack>
                        </HStack>
                    </Flex>

                    <Box display="block" overflowX="auto" width="100%">
                        <Table.Root variant="outline">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader minW="200px">Ref No.</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Booking</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Room</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="100px">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="100px">Method</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="100px" textAlign="right">Amount</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Date Paid</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="80px" textAlign="center">Action</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {values?.record?.data && values?.record?.data.length > 0 ? (
                                    (values?.record?.data.map)(payment => (
                                        <Table.Row key={payment.id}>
                                            <Table.Cell>
                                                <Text fontSize="sm" color="blue.500">{payment.ref_no}</Text>
                                            </Table.Cell>
                                            <Table.Cell>{payment.booking.ref_no}</Table.Cell>
                                            <Table.Cell>{payment.booking.room_type_name}</Table.Cell>
                                            <Table.Cell>
                                                <Status.Root colorPalette={statusBadgeClass(payment.status)}>
                                                    <Status.Indicator />
                                                    {payment.status}
                                                </Status.Root>
                                            </Table.Cell>
                                            <Table.Cell>{payment.method ?? 'N/A'}</Table.Cell>
                                            <Table.Cell textAlign="right">₱ {priceFormat(payment.amount)}</Table.Cell>
                                            <Table.Cell>{payment.paid_at ? dateTime(payment.paid_at) : 'N/A'}</Table.Cell>
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
                                                                        Show Details
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
                </Card.Body>
            </Card.Root>
        </MainLayout>
    );
}