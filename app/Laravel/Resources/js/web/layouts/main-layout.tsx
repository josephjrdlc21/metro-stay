import { PropsWithChildren } from "react"

import AppTopbar from "@web/components/app-topbar"
import { Box, Container } from '@chakra-ui/react'

export default function MainLayout({ children }: PropsWithChildren){
    return(
        <Box 
            minH="100vh" 
            fontFamily="'Roboto', sans-serif"
            w="full"
            overflowX="hidden"
            _dark={{ bg: "gray.900" }} 
        >
            <Container maxWidth="8xl">
                <AppTopbar/>
                <Box p={4}>{children}</Box>
            </Container>
        </Box>
    );
}