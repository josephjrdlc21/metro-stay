import { ReactNode } from 'react'
import { useRoute } from "@ziggy"

import { ColorModeButton } from "@/components/ui/color-mode"
import {Box, Flex, HStack, Text, IconButton, Button,  
    Link, useDisclosure, Stack, Icon, Container} from '@chakra-ui/react'
import { FaEnvelopeOpen } from 'react-icons/fa'
import {AiOutlineMenu} from "react-icons/ai"

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
};

const Links = [
    { name: 'Home', href: '#' },
    { name: 'Hotels', href: '#' },
    { name: 'Experience', href: '#' },
    { name: 'About', href: '#' },
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
                        <Button rounded={'full'}>
                            <Link href={route('web.auth.login')} color="gray.200" _dark={{ color: "gray.800" }}>Login</Link>
                        </Button>
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