import { ElementType } from "react"
import { useRoute } from "@ziggy"
import { Link, usePage } from "@inertiajs/react"
import { useSidebar } from "@portal/context/sidebar-context"

import {Box, Icon, Separator, Stack, Text, VStack,} from "@chakra-ui/react"
import { FaEnvelopeOpen } from "react-icons/fa"
import {AiOutlineBarChart, AiOutlineBlock, AiOutlineCalendar, AiOutlineCreditCard,
    AiOutlineDesktop, AiOutlineFieldTime, AiOutlineFileDone, AiOutlinePicCenter,
    AiOutlineTeam, AiOutlineUser, AiOutlineUserSwitch, AiOutlineWallet} from "react-icons/ai"

type Navigation = {
    label: string;
    icon: ElementType;
    href: string;
};

export default function AppSidebar(){
    const route = useRoute();

    const { isOpen, sidebarRef } = useSidebar();
    const { url } = usePage();

    const navigationItems: Navigation[] = [
        {
            label: "Users",
            icon: AiOutlineUser,
            href: route("portal.users.index"),
        },
        {
            label: "Bookings",
            icon: AiOutlineCalendar,
            href: route("portal.bookings.index"),
        },
        {
            label: "Customers",
            icon: AiOutlineTeam,
            href: route("portal.customers.index"),
        },
        {
            label: "Rooms",
            icon: AiOutlineWallet,
            href: route("portal.rooms.index"),
        },
        {
            label: "Room Types",
            icon: AiOutlinePicCenter,
            href: route("portal.room_types.index"),
        },
        {
            label: "House Keeping",
            icon: AiOutlineBlock,
            href: "#",
        },
        {
            label: "Payments",
            icon: AiOutlineCreditCard,
            href: route("portal.payments.index"),
        },
        {
            label: "Sales Reports",
            icon: AiOutlineBarChart,
            href: "#",
        },
        {
            label: "Activity Logs",
            icon: AiOutlineFieldTime,
            href: "#",
        },
    ];

    const handytoolItems: Navigation[] = [
        {
            label: "Dashboard",
            icon: AiOutlineDesktop,
            href: route("portal.index"),
        },
    ]

    const contentControlItems: Navigation[] = [
        {
            label: "Roles",
            icon: AiOutlineUserSwitch,
            href: "#",
        },
        {
            label: "Permissions",
            icon: AiOutlineFileDone,
            href: "#",
        },
    ]

    return(
        <Box
            ref={sidebarRef}
            w={{
                base: isOpen ? "256px" : "0px",
                md: isOpen ? "256px" : "80px",
                lg: isOpen ? "80px" : "256px",
            }}
            h="full"
            borderRight="1px"
            bg="white"
            transition="all 0.3s ease-in-out"
            zIndex={{ base: "overlay", md: "auto" }}
            pos={{ base: "fixed", md: "relative" }}
            top="0"
            left="0"
            _dark={{ bg:"gray.900" }}
        >
            {/* Logo */}
            <Box display={{ base: isOpen ? "flex" : "none", md: "flex", lg: "flex"}} justifyContent={{ base: isOpen ? "flex-start" : "none", md: isOpen ? "flex-start" : "center", lg: isOpen ? "center" : "flex-start"}} alignItems="center" gap={2} p={5}>
                <Icon as={FaEnvelopeOpen} boxSize={6} color="cyan.600"/>
                <Text fontSize="2xl" fontWeight="semibold" _dark={{ color: "gray.100" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                    MetroStay
                </Text>
            </Box>
            {/* Sidebar Sections */}
            <VStack align="start" px={5} py={4} maxH="calc(100vh - 80px)" overflowY="auto" display={{ base: isOpen ? "block" : "none", md: "block", lg: "block"}}
                css={{
                    "&::-webkit-scrollbar": {
                        width: "0px",
                        transition: "width 0.3s",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "lightgray",
                        borderRadius: "24px",
                    },
                    "&:hover::-webkit-scrollbar": {
                        width: "6px",
                    },
                }}
            >
                <Text fontSize="sm" fontWeight="semibold" _dark={{ color: "gray.200" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                    Handy Tool
                </Text>
                <VStack align="start" w="full" mt={2}>
                    {handytoolItems.map((item) => (
                        <Box
                            key={item.label}
                            display="flex"
                            alignItems="center"
                            gap={3}
                            px={3}
                            py={3}
                            w="full"
                            rounded="md"
                            _dark={{ color: "gray.300" }}
                            color={url === item.href ? "white" : "gray.600"}
                            bg={url === item.href ? "cyan.600" : ""}
                            transition="all 0.2s ease-in-out"
                            role="group"
                            _hover={{
                                bg: "cyan.600",
                                cursor: "pointer",
                                color: "white",
                            }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                width: "100%",
                                }}
                            >
                                <Icon boxSize={4} as={item.icon} />
                                <Text
                                    fontSize="sm"
                                    fontWeight="normal"
                                    display={{
                                        base: isOpen ? "block" : "none",
                                        lg: isOpen ? "none" : "block",
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                </VStack>

                <Stack w="full">
                    <Separator mt={2} mb={4}/>
                    <Text fontSize="sm" fontWeight="semibold" _dark={{ color: "gray.200" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                        Navigation
                    </Text>
                </Stack>
                <VStack align="start" w="full" mt={2}>
                    {navigationItems.map((item) => (
                        <Box
                            key={item.label}
                            display="flex"
                            alignItems="center"
                            gap={3}
                            px={3}
                            py={3}
                            w="full"
                            rounded="md"
                            _dark={{ color: "gray.300" }}
                            color={url === item.href ? "white" : "gray.600"}
                            bg={url === item.href ? "cyan.600" : ""}
                            transition="all 0.2s ease-in-out"
                            role="group"
                            _hover={{
                                bg: "cyan.600",
                                cursor: "pointer",
                                color: "white",
                            }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                width: "100%",
                                }}
                            >
                                <Icon boxSize={4} as={item.icon} />
                                <Text
                                    fontSize="sm"
                                    fontWeight="normal"
                                    display={{
                                        base: isOpen ? "block" : "none",
                                        lg: isOpen ? "none" : "block",
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                </VStack>

                <Stack w="full">
                    <Separator mt={2} mb={4}/>
                    <Text fontSize="sm" fontWeight="semibold" _dark={{ color: "gray.200" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                        Content Control
                    </Text>
                </Stack>
                <VStack align="start" w="full" mt={2}>
                    {contentControlItems.map((item) => (
                        <Box
                            key={item.label}
                            display="flex"
                            alignItems="center"
                            gap={3}
                            px={3}
                            py={3}
                            w="full"
                            rounded="md"
                            _dark={{ color: "gray.300" }}
                            color={url === item.href ? "white" : "gray.600"}
                            bg={url === item.href ? "cyan.600" : ""}
                            transition="all 0.2s ease-in-out"
                            role="group"
                            _hover={{
                                bg: "cyan.600",
                                cursor: "pointer",
                                color: "white",
                            }}
                        >
                            <Link
                                href={item.href}
                                style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                width: "100%",
                                }}
                            >
                                <Icon boxSize={4} as={item.icon} />
                                <Text
                                    fontSize="sm"
                                    fontWeight="normal"
                                    display={{
                                        base: isOpen ? "block" : "none",
                                        lg: isOpen ? "none" : "block",
                                    }}
                                >
                                    {item.label}
                                </Text>
                            </Link>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </Box>
    );
}