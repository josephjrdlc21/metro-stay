import { useRoute } from "@ziggy";
import { useSidebar } from "@portal/context/sidebar-context";

import {Avatar, Box, Flex, Icon, IconButton, Input, InputGroup,
    Link, Menu, Portal, Text} from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { LuSearch } from "react-icons/lu";
import { TfiLayoutListPost } from "react-icons/tfi";
import {AiOutlineMenu, AiOutlineLock, AiOutlineLogout, AiOutlineUserSwitch} from "react-icons/ai";

export default function AppTopbar(){
    const route = useRoute();

    const { toggleSidebar } = useSidebar();

    return(
        <Box
            w="full"
            h="76px"
            borderBottom="1px"
            bg="bg.surface"
        >
            <Flex align="center" justifyContent="space-between" h="full">
                <Flex align="center">
                    <IconButton aria-label="Search database" variant="outline" mx="3" bg="cyan.100" color="cyan.700" border="none" rounded="lg" size="sm"
                        onClick={toggleSidebar}
                        _hover={{
                            color: "gray.100",
                            bg: "cyan.700",
                        }}
                        _dark={{ color: "gray.100", bg: "cyan.700" }}
                    >
                        <Icon as={AiOutlineMenu} />
                    </IconButton>
                    <InputGroup flex="1" startElement={<LuSearch />} mx="3" endElement={<Icon as={TfiLayoutListPost} color="cyan.700" />} w={{ base: "130px", md: "300px" }}>
                        <Input placeholder="Search" rounded="lg"/>
                    </InputGroup>
                </Flex>
                <Flex px={4}>
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
                                            <Text textStyle="xs" fontWeight="light">master admin</Text>
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
                                            <Link href={route('portal.auth.logout')}  style={{ border: "0px", outline: "none", boxShadow: "none", textDecoration: "none", color: "inherit"}}>
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
        </Box>
    );
}