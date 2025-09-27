import { route, useRoute } from "@ziggy"

import { ColorModeButton } from "@/components/ui/color-mode"
import {Box, Flex, HStack, Text, IconButton, Menu, Portal, Avatar, 
    Link, useDisclosure, Stack, Icon, Container} from '@chakra-ui/react'
import { FaEnvelopeOpen } from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineUserSwitch, AiOutlineLock, AiOutlineLogout } from "react-icons/ai"

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

const Links = [
    { name: 'Dashboard', href: route('web.index') },
    { name: 'Hotels', href: route('web.hotels.index') },
    { name: 'Bookings', href: route('web.bookings.index') },
    { name: 'Payments', href: route('web.payments.index') },
];

const NavLink = ({ href, children }: NavLinkProps) => {

    return (
        <Link
            href={href}
            px={2}
            py={1}
            rounded={'md'}
        >
            {children}
        </Link>
  );
}

export default function WithAction() {
    const route = useRoute()
    
    const { open, onOpen, onClose } = useDisclosure()

    return (
        <Box px={4}
            position="fixed"
            top="0"
            left="0"
            right="0"
            zIndex={1000}
            boxShadow="sm"
            bg="white"
            _dark={{ bg: "gray.800" }}
        >
            <Container>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton size={'xs'} bg="cyan.100" color="cyan.700"
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={open ? onClose : onOpen}
                        _dark={{ color: "gray.100", bg: "cyan.700" }}
                    >
                        <AiOutlineMenu/>
                    </IconButton>
                    <Flex alignItems={'center'} gap={2}>
                        <Icon as={FaEnvelopeOpen} boxSize={5} color="cyan.600"/>
                        <Text fontSize="xl" fontWeight="semibold" _dark={{ color: "gray.100" }} color="gray.700">
                            MetroStay
                        </Text>
                    </Flex>
                    <HStack alignItems={'center'}>
                        <HStack as={'nav'} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.name} href={link.href}>
                                    {link.name}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <ColorModeButton mx={3}/>
                        <Menu.Root>
                            <Menu.Trigger rounded="full" focusRing="outside">
                                <Avatar.Root size="sm" cursor="pointer">
                                    <Avatar.Fallback name="Segun Adebayo" />
                                    <Avatar.Image src="https://bit.ly/sage-adebayo" />
                                </Avatar.Root>
                            </Menu.Trigger>
                            <Portal>
                                <Menu.Positioner>
                                    <Menu.Content>
                                        <Menu.ItemGroup>
                                            <Menu.ItemGroupLabel>
                                                Segun Adebayo
                                                <Text textStyle="xs" fontWeight="light">customer</Text>
                                            </Menu.ItemGroupLabel>
                                            <Menu.Item display="flex" alignItems="center" cursor="pointer" value="bold">
                                                <Icon boxSize={4} as={AiOutlineUserSwitch} />
                                                <Link href="#"  style={{ border: "0px", outline: "none", boxShadow: "none", textDecoration: "none", color: "inherit"}}>
                                                    Profile
                                                </Link>
                                            </Menu.Item>
                                        </Menu.ItemGroup>
                                        <Menu.Separator />
                                        <Menu.ItemGroup>
                                            <Menu.Item display="flex" alignItems="center" cursor="pointer" value="settings">
                                                <Icon boxSize={4} as={AiOutlineLock} />
                                                <Link href="#"  style={{ border: "0px", outline: "none", boxShadow: "none", textDecoration: "none", color: "inherit"}}>
                                                    Change Password
                                                </Link>  
                                            </Menu.Item>
                                            <Menu.Item display="flex" alignItems="center" cursor="pointer" value="logout">
                                                <Icon boxSize={4} as={AiOutlineLogout} />
                                                <Link href={route('web.auth.logout')}  style={{ border: "0px", outline: "none", boxShadow: "none", textDecoration: "none", color: "inherit"}}>
                                                    Logout
                                                </Link>
                                            </Menu.Item>
                                        </Menu.ItemGroup>
                                    </Menu.Content>
                                </Menu.Positioner>
                            </Portal>
                        </Menu.Root>
                    </Flex>
                </Flex>

                {open ? (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as={'nav'}>
                        {Links.map((link) => (
                            <NavLink key={link.name} href={link.href}>
                                {link.name}
                            </NavLink>
                        ))}
                    </Stack>
                </Box>
                ) : null}
            </Container>
        </Box>
    )
}