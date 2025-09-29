import { useRoute } from "@ziggy"

import { Head, Link} from "@inertiajs/react"

import { statusBadgeClass, priceFormat, strTitleCase, quantityFormat } from "@portal/utils/helper"

import MainLayout from "@portal/layouts/main-layout"
import {Box, Button, Card, Text, Heading, Separator, Menu, Portal,
    Breadcrumb, Flex, SimpleGrid, Container, Status} from "@chakra-ui/react"
import { LuHouse, LuArrowLeftFromLine } from "react-icons/lu"
import { FiChevronDown } from "react-icons/fi"

interface Values {
    page_title: string
    booking: {
        id: number
        ref_no: string
        room_number: string | number
        room_type_name: string
        status: string
        guest: string | number
        total_amount: number
        check_in: string
        check_out: string
        customer: {
            email: string
            name: string
            phone_number: string
        }
    }
}

export default function BookingsShow({ values }: { values: Values }){
    const route = useRoute();

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Bookings</Heading>
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
                                    <Breadcrumb.Link href="#">Bookings</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Show Booking</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Container maxW="3xl" mt={4} style={{padding: "0px"}}>
                <Card.Root size="sm">
                    <Card.Header pb={2}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Show booking details</Heading>
                    </Card.Header>
                    <Separator mt={2} mb={2} />
                    <Card.Body>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold">Reference No.</Text>
                                <Text  color="blue.500" textStyle="sm">{values.booking.ref_no}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Room Name</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.room_type_name}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Total Amount</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">₱ {priceFormat(values.booking.total_amount)}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Check Out</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.check_out}</Text>
                            </Box>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold">Room No.</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.room_number}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Status</Text>
                                <Status.Root colorPalette={statusBadgeClass(values.booking.status)}>
                                    <Status.Indicator />
                                    {values.booking.status}
                                </Status.Root>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Guest</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{quantityFormat(values.booking.guest)}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Check In</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.check_in}</Text>
                            </Box>
                        </SimpleGrid>

                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md" mt={4} textAlign={{ base: "center", lg: "left" }}>Customer Details</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Name</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.customer.name}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Email</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.customer.email}</Text>
                            </Box>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Contact No.</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.booking.customer.phone_number}</Text>
                            </Box>
                        </SimpleGrid>
                    </Card.Body>
                    <Separator mt={4} mb={2} />
                    <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                        <Link href={route('portal.bookings.index')}>
                            <Button variant="solid" size="sm">
                                <LuArrowLeftFromLine/> Go Back
                            </Button>
                        </Link>
                        <Menu.Root>
                            <Menu.Trigger asChild _focus={{ boxShadow: "none", outline: "none" }} _active={{ bg: "transparent" }}>
                                <Button aria-label="action" size="sm" colorPalette="blue">
                                    {strTitleCase(values.booking.status)} <FiChevronDown/>
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.Item cursor="pointer" value="confirm">
                                            Confirm
                                        </Menu.Item>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </Card.Footer>
                </Card.Root>
            </Container>
        </MainLayout>
    );
}