import { Box } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { VStack } from "@chakra-ui/react"
import { Separator } from "@chakra-ui/react"
import { FaEnvelopeOpen } from "react-icons/fa"
import { FaHome } from "react-icons/fa"
import { FaUser } from "react-icons/fa"

export default function AppSidebar(){
    return(
        <Box
            w={{ base: 'full', md: "256px" }}
            h="full"
            borderRight="1px"
            bg="white"
        >
            {/* Logo */}
            <Box display="flex" alignItems="center" gap={2} p="5">
                <Icon as={FaEnvelopeOpen} boxSize={6} color="cyan.600" />
                <Text fontSize="2xl" color="gray.700">MetroStay</Text >
            </Box>

            {/* Sidebar Sections */}
            <VStack align="start" px="4">
                {/* Quick Access */}
                <Text fontSize="md" fontWeight="medium" color="gray.500">
                    Quick Access
                </Text>
                <VStack align="start" w="full">
                    <Box display="flex" alignItems="center" gap={3} px={3} py={2}>
                        <Icon boxSize={4} as={FaHome} color="gray.400"/>
                        <Text fontSize="sm" color="gray.600">Dashboard</Text>
                    </Box>
                    <Box display="flex" alignItems="center" gap={3} px={3} py={2}>
                        <Icon boxSize={4} as={FaUser} color="gray.400"/>
                        <Text fontSize="sm" color="gray.600">Users</Text>
                    </Box>
                </VStack>
                <Separator variant="solid" />
            </VStack>
        </Box>
    );
}