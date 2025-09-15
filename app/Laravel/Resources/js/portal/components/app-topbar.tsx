import { useSidebar } from "@portal/context/SidebarContext"
import { Box, Flex } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Icon } from "@chakra-ui/react"
import { Menu } from "@chakra-ui/react"
import { Portal } from "@chakra-ui/react"
import { TfiLayoutListPost } from "react-icons/tfi"
import { TfiMenu } from "react-icons/tfi"

export default function AppTopbar(){
    const { toggleSidebar } = useSidebar();

    return(
        <Box
            w="full"
            h="76px"
            borderBottom="1px"
            bg="white"
        >
            <Flex align="center" justifyContent="space-between" h="full">
                <Flex>
                    <IconButton aria-label="Search database" variant="outline" mx="3" bg="cyan.100" color="cyan.700" border="none" rounded="lg"
                        onClick={toggleSidebar}
                        _hover={{
                            color: "gray.100",
                            bg: "cyan.700",
                        }}
                    >
                        <Icon as={TfiMenu} />
                    </IconButton>
                    <InputGroup flex="1" startElement={<LuSearch />} mx="3" endElement={<Icon as={TfiLayoutListPost} color="cyan.700" />} w={{ base: "180px", md: "300px" }}>
                        <Input placeholder="Search" rounded="lg"/>
                    </InputGroup>
                </Flex>
                <Flex px={4}>
                    <Menu.Root positioning={{ placement: "right-end" }}>
                        <Menu.Trigger rounded="full" focusRing="outside">
                            <Avatar.Root size="sm" cursor="pointer">
                                <Avatar.Fallback name="Segun Adebayo" />
                                <Avatar.Image src="https://bit.ly/sage-adebayo" />
                            </Avatar.Root>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                            <Menu.Content>
                                <Menu.Item cursor="pointer" value="account">Account</Menu.Item>
                                <Menu.Item cursor="pointer" value="settings">Settings</Menu.Item>
                                <Menu.Item cursor="pointer" value="logout">Logout</Menu.Item>
                            </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </Flex>
            </Flex>
        </Box>
    );
}