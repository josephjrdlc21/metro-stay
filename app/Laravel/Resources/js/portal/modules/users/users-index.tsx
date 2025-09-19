import MainLayout from "@portal/layouts/main-layout"
import AppNotification from "@portal/components/app-notification"

import { Heading, Text } from "@chakra-ui/react"
import { Breadcrumb, Status } from "@chakra-ui/react"
import { Flex, Separator } from "@chakra-ui/react"
import { Card,Table, Menu } from "@chakra-ui/react"
import { IconButton, Button } from "@chakra-ui/react"
import { Box, HStack, Grid, Portal } from "@chakra-ui/react"
import { Field, Input, NativeSelect } from "@chakra-ui/react"
import { LuHouse, LuEllipsisVertical } from "react-icons/lu"
import { RiSearch2Line, RiResetRightLine, RiAddCircleLine } from "react-icons/ri"

import { useRoute } from "@ziggy"
import { FormEvent } from "react"
import { Head } from "@inertiajs/react"
import { Link, usePage, useForm, router } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"
import { statusBadgeClass, dateTime, formatId } from "@portal/utils/helper"

interface Values {
    page_title: string,
    statuses: { [key: string]: string }
    keyword: string
    selected_status: string
    start_date: string
    end_date: string
    record: {
        data: any[],
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

export default function UsersIndex({ values }: { values: Values }){
    // console.log(values);
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, processing } = useForm<FormValues>({
        keyword: values.keyword ?? '',
        status: values.selected_status ?? '',
        start_date: values.start_date ?? '',
        end_date: values.end_date ?? '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        router.get(route('portal.users.index'), data);
    };

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Users</Heading>
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
                                    <Breadcrumb.CurrentLink>Users</Breadcrumb.CurrentLink>
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
                                <Input name="name" placeholder="e.g., Name, Email" value={data.keyword} onChange={e => setData('keyword', e.target.value)}/>
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
                            <Link href={route('portal.users.index')} disabled={processing}>
                                <Button colorPalette="gray" variant="solid" size="sm" disabled={processing}>
                                    <RiResetRightLine /> Clear
                                </Button>
                            </Link>
                        </HStack>
                    </form>

                    <Separator mt={2} mb={4}/>

                    <Flex justify="space-between" align="center" mb={3}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="lg">User Records</Heading>
                        <HStack>
                            <Link href={route('portal.users.create')}>
                                <Button colorPalette="cyan" variant="solid" size="sm">
                                    <RiAddCircleLine /> Add User
                                </Button>
                            </Link>
                        </HStack>
                    </Flex>

                    <Box display="block" overflowX="auto" width="100%">
                        <Table.Root variant="outline">
                            <Table.Header>
                                <Table.Row>
                                    <Table.ColumnHeader minW="200px">Name</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="150px">Role</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="100px">Status</Table.ColumnHeader>
                                    <Table.ColumnHeader minW="200px">Created At</Table.ColumnHeader>
                                    <Table.ColumnHeader textAlign="center" minW="80px">Action</Table.ColumnHeader>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {values?.record?.data && values?.record?.data.length > 0 ? (
                                    (values?.record?.data.map)(user => (
                                        <Table.Row key={user.id}>
                                            <Table.Cell>
                                                <Text fontSize="sm" color="blue.500">{formatId(user.id)}</Text>
                                                {user.name}
                                            </Table.Cell>
                                            <Table.Cell>Master Admin</Table.Cell>
                                            <Table.Cell>
                                                <Status.Root colorPalette={statusBadgeClass(user.status)}>
                                                    <Status.Indicator />
                                                    {user.status}
                                                </Status.Root>
                                            </Table.Cell>
                                            <Table.Cell>{dateTime(user.created_at)}</Table.Cell>
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
                                                                <Menu.Item cursor="pointer" value="edit">Edit</Menu.Item>
                                                            </Menu.Content>
                                                        </Menu.Positioner>
                                                    </Portal>
                                                </Menu.Root>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={5} textAlign="center">No Record Found.</Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Card.Body>
            </Card.Root>
        </MainLayout>
    );
}