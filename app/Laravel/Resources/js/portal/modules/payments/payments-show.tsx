import { useRoute } from "@ziggy"

import { Head, Link} from "@inertiajs/react"

import { statusBadgeClass, priceFormat, dateTime, quantityFormat, strTitleCase } from "@portal/utils/helper"

import MainLayout from "@portal/layouts/main-layout"
import {Box, Button, Card, Text, Heading, Separator, Menu, Portal,
    Breadcrumb, Flex, SimpleGrid, Container, Status} from "@chakra-ui/react"
import { LuHouse, LuArrowLeftFromLine } from "react-icons/lu"
import { FiChevronDown } from "react-icons/fi"

interface Values {
    page_title: string
    payment: {
        id: number
        ref_no: string
        paid_at: null | string
        method: null | string
        status: string
        created_at: string
        amount: string | number
        booking: {
            room_number: number | string
            room_type_name: string
            guest: number | string
            check_in: string
            check_out: string
        }
        customer: {
            email: string
            name: string
            phone_number: string
        }
    }
}

export default function PaymentsShow({ values }: { values: Values }){
    const route = useRoute();

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
                                    <Breadcrumb.Link href="#">Payments</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Show Payment</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Container maxW="3xl" mt={4} style={{padding: "0px"}}>
                <Card.Root size="sm">
                    <Card.Header pb={2}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Show payment details</Heading>
                    </Card.Header>
                    <Separator mt={2} mb={2} />
                    <Card.Body>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold">Reference No.</Text>
                                <Text  color="blue.500" textStyle="sm">{values.payment.ref_no}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Method</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.method ?? 'N/A'}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Amount</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">₱ {priceFormat(values.payment.amount)}</Text>
                            </Box>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold">Paid At</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.paid_at ?? 'N/A'}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Status</Text>
                                <Status.Root colorPalette={statusBadgeClass(values.payment.status)}>
                                    <Status.Indicator />
                                    {values.payment.status}
                                </Status.Root>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Date Created</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{dateTime(values.payment.created_at)}</Text>
                            </Box>
                        </SimpleGrid>

                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md" mt={4} textAlign={{ base: "center", lg: "left" }}>Booking Details</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Name</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.booking.room_type_name}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Guest</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{quantityFormat(values.payment.booking.guest)}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Check Out</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.booking.check_out}</Text>
                            </Box>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Room No.</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.booking.room_number}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Check In</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.booking.check_in}</Text>
                            </Box>
                        </SimpleGrid>

                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md" mt={4} textAlign={{ base: "center", lg: "left" }}>Customer Details</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap={2}>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Name</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.customer.name}</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Email</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.customer.email}</Text>
                            </Box>
                            <Box textAlign={{ base: "center", lg: "left" }}>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm" fontWeight="semibold" mt={4}>Contact No.</Text>
                                <Text _dark={{ color: "gray.300" }} color="gray.700" textStyle="sm">{values.payment.customer.phone_number}</Text>
                            </Box>
                        </SimpleGrid>
                    </Card.Body>
                    <Separator mt={4} mb={2} />
                    <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                        <Link href={route('portal.payments.index')}>
                            <Button variant="solid" size="sm">
                                <LuArrowLeftFromLine/> Go Back
                            </Button>
                        </Link>
                        <Menu.Root>
                            <Menu.Trigger asChild _focus={{ boxShadow: "none", outline: "none" }} _active={{ bg: "transparent" }}>
                                <Button aria-label="action" size="sm" colorPalette="red">
                                    {strTitleCase(values.payment.status)} <FiChevronDown/>
                                </Button>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.Item cursor="pointer" value="confirm">
                                            Confirm Payment
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