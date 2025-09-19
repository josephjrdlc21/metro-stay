import { useRoute } from "@ziggy";
import { Link, usePage } from "@inertiajs/react";
import { useSidebar } from "@portal/context/sidebar-context";

import {Box, Icon, Separator, Stack, Text, VStack,} from "@chakra-ui/react";
import { FaEnvelopeOpen } from "react-icons/fa";
import {AiOutlineBarChart, AiOutlineBlock, AiOutlineCalendar, AiOutlineCreditCard,
    AiOutlineDesktop, AiOutlineFieldTime, AiOutlineFileDone, AiOutlinePicCenter,
    AiOutlineTeam, AiOutlineUser, AiOutlineUserSwitch, AiOutlineWallet} from "react-icons/ai";

export default function AppSidebar(){
    const route = useRoute();

    const { isOpen, sidebarRef } = useSidebar();
    const { url } = usePage();

    return(
        <Box
            ref={sidebarRef}
            w={{
                base: isOpen ? "256px" : "0px",
                md: isOpen ? "256px" : "80px",
                lg: isOpen ? "80px" : "256px",
            }}
            h="100vh"
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
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color={url === '/admin' ? "white" : 'gray.600'} gap={3} px={3} py={3} w="full" rounded="md" bg={url === '/admin' ? "cyan.600" : ''}
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href={route('portal.index')} style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineDesktop} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Dashboard
                            </Text>
                        </Link>
                    </Box>
                </VStack>

                <Stack w="full">
                    <Separator mt={2} mb={4}/>
                    <Text fontSize="sm" fontWeight="semibold" _dark={{ color: "gray.200" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                        Navigation
                    </Text>
                </Stack>
                <VStack align="start" w="full" mt={2}>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color={url === '/admin/users' ? "white" : 'gray.600'} gap={3} px={3} py={3} w="full" rounded="md" bg={url === '/admin/users' ? "cyan.600" : ''}
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href={route('portal.users.index')} style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineUser} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Users
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" gap={3} px={3} py={3} w="full" rounded="md" _dark={{ color: "gray.300" }} color="gray.600"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineCalendar} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Bookings
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineTeam} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Customers
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineWallet} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Rooms
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlinePicCenter} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Room Types
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineBlock} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                House Keeping
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineCreditCard} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Payments
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineBarChart} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Sales Reports
                            </Text>
                        </Link>
                    </Box>
                </VStack>

                <Stack w="full">
                    <Separator mt={2} mb={4}/>
                    <Text fontSize="sm" fontWeight="semibold" _dark={{ color: "gray.200" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                        Content Control
                    </Text>
                </Stack>
                <VStack align="start" w="full" mt={2}>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineUserSwitch} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Roles
                            </Text>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineFileDone} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Permissions
                            </Text>
                        </Link>
                    </Box>
                </VStack>

                <Stack w="full">
                    <Separator mt={2} mb={4}/>
                    <Text fontSize="sm" fontWeight="semibold" _dark={{ color: "gray.200" }} color="gray.700" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                        Setting
                    </Text>
                </Stack>
                <VStack align="start" w="full" mt={2}>
                    <Box display="flex" alignItems="center" _dark={{ color: "gray.300" }} color="gray.600" gap={3} px={3} py={3} w="full" rounded="md"
                        transition="all 0.2s ease-in-out" role="group" _hover={{
                        bg: "cyan.600",
                        cursor: "pointer",
                        color: "white",
                    }}>
                        <Link href="#" style={{display: "flex", alignItems: "center", gap: "12px", width: "100%"}}>
                            <Icon boxSize={4} as={AiOutlineFieldTime} />
                            <Text fontSize="sm" fontWeight="normal" display={{ base: isOpen ? "block" : "none", lg: isOpen ? "none" : "block"}}>
                                Activity Logs
                            </Text>
                        </Link>
                    </Box>
                </VStack>
            </VStack>
        </Box>
    );
}