import MainLayout from "@portal/layouts/main-layout"
import { Card } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Breadcrumb } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { LuHouse } from "react-icons/lu"
import { Head } from "@inertiajs/react"
import { Table } from "@chakra-ui/react"
import { Status } from "@chakra-ui/react"
import { Menu } from "@chakra-ui/react"
import { Portal } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { LuEllipsisVertical } from "react-icons/lu"

export default function UsersIndex({ values }: { values: any }){
    //console.log(values);

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify="space-between" align="center">
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
                    <Box display="block" overflowX="auto" width="100%">
                        <Table.Root>
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
                                <Table.Row>
                                    <Table.Cell>Juan Dela Cruz</Table.Cell>
                                    <Table.Cell>Master Admin</Table.Cell>
                                    <Table.Cell>
                                        <Status.Root colorPalette="green">
                                            <Status.Indicator />
                                            Active
                                        </Status.Root>
                                    </Table.Cell>
                                    <Table.Cell>08/07/2025 09:15 AM</Table.Cell>
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
                            </Table.Body>
                        </Table.Root>
                    </Box>
                </Card.Body>
            </Card.Root>
        </MainLayout>
    );
}