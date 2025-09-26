import { PropsWithChildren } from "react"

import AppTopbar from "@web/components/app-topbar"
import AppFooter from "@web/components/app-footer";
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
            <AppTopbar/>

            <Container maxWidth="8xl" mt={20}>
                <Box py={4}>{children}</Box>
            </Container>
            
            <AppFooter/>
        </Box>
    );
}