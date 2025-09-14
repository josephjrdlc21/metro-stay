import { Box, Flex } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { InputGroup } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { TfiLayoutListPost } from "react-icons/tfi"
import { TfiMenu } from "react-icons/tfi"

export default function AppTopbar(){
    return(
        <Box
            w="full"
            h="76px"
            borderBottom="1px"
            bg="white"
        >
            <Flex align="center" justifyContent="space-between" h="full">
                <Flex>
                    <IconButton aria-label="Search database" variant="outline" mx="3">
                        <TfiMenu />
                    </IconButton>
                    <InputGroup flex="1" startElement={<LuSearch />} mx="3" endElement={<TfiLayoutListPost />} w="300px">
                        <Input placeholder="Search" />
                    </InputGroup>
                </Flex>
                <Flex>
                    <Avatar.Root mx="3" shadow="md">
                        <Avatar.Fallback name="Segun Adebayo" />
                        <Avatar.Image src="https://bit.ly/sage-adebayo" />
                    </Avatar.Root>
                </Flex>
            </Flex>
        </Box>
    );
}