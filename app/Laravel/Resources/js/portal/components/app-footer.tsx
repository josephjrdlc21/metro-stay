import { Text } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react";

export default function AppFooter(){
    const currentYear = new Date().getFullYear();

    return(
        <Box p={4} textAlign="center" color="gray.600">
            <Text fontSize="sm" fontWeight="normal">
                Copyright © {currentYear} Joseph. All rights reserved.
            </Text> 
        </Box>
    );
}