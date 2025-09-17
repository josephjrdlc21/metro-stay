import MainLayout from "@portal/layouts/main-layout"
import { Card } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Breadcrumb } from "@chakra-ui/react"
import { Flex, Separator } from "@chakra-ui/react"
import { LuHouse, LuEllipsisVertical } from "react-icons/lu"
import { Head } from "@inertiajs/react"
import { Table } from "@chakra-ui/react"
import { Status } from "@chakra-ui/react"
import { Menu } from "@chakra-ui/react"
import { Portal } from "@chakra-ui/react"
import { IconButton, Button } from "@chakra-ui/react"
import { Box, HStack } from "@chakra-ui/react"
import { Field, Input, Select, createListCollection } from "@chakra-ui/react"
import { Grid } from "@chakra-ui/react"
import { RiSearch2Line, RiResetRightLine, RiAddCircleLine } from "react-icons/ri"
import { statusBadgeClass } from "@portal/utils/helper"

export default function UsersIndex({ values }: { values: any }){
    //console.log(values);

    const statuses = createListCollection({
        items: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
        ],
    })

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
                    <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} gap={3} mb={3}>
                        <Field.Root>
                            <Field.Label>Search</Field.Label>
                            <Input name="name" placeholder="e.g., Name, Email"/>
                        </Field.Root>

                        <Select.Root collection={statuses}>
                            <Select.HiddenSelect />
                            <Select.Label>Status</Select.Label>
                            <Select.Control>
                                <Select.Trigger>
                                    <Select.ValueText placeholder="Select Status" />
                                </Select.Trigger>
                                <Select.IndicatorGroup>
                                    <Select.Indicator />
                                </Select.IndicatorGroup>
                            </Select.Control>
                            <Portal>
                                <Select.Positioner>
                                    <Select.Content>
                                        {statuses.items.map((statuses) => (
                                            <Select.Item item={statuses} key={statuses.value}>
                                                {statuses.label}
                                                <Select.ItemIndicator />
                                            </Select.Item>
                                        ))}
                                    </Select.Content>
                                </Select.Positioner>
                            </Portal>
                        </Select.Root>

                        <Field.Root>
                            <Field.Label>From</Field.Label>
                            <Input type="date" name="from"/>
                        </Field.Root>

                        <Field.Root>
                            <Field.Label>To</Field.Label>
                            <Input type="date" name="to" />
                        </Field.Root>
                    </Grid>

                    <HStack mb={2}>
                        <Button colorPalette="cyan" variant="subtle" size="sm">
                            <RiSearch2Line /> Filter
                        </Button>
                        <Button colorPalette="gray" variant="subtle" size="sm">
                            <RiResetRightLine /> Clear
                        </Button>
                    </HStack>

                    <Separator mt={2} mb={4}/>

                    <Flex justify="space-between" align="center" mb={3}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="lg">User Records</Heading>
                        <HStack>
                            <Button colorPalette="cyan" variant="subtle" size="sm">
                                <RiAddCircleLine /> Add User
                            </Button>
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
                                <Table.Row>
                                    <Table.Cell>Juan Dela Cruz</Table.Cell>
                                    <Table.Cell>Master Admin</Table.Cell>
                                    <Table.Cell>
                                        <Status.Root colorPalette={statusBadgeClass('active')}>
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