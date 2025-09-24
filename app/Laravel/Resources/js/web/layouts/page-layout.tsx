import { PropsWithChildren } from "react"

import PageTopbar from "@web/components/page-topbar"
import PageFooter from "@web/components/page-footer"
import { Box, Container } from '@chakra-ui/react'

export default function PageLayout({ children }: PropsWithChildren){
    return(
        <Box 
            minH="100vh" 
            fontFamily="'Roboto', sans-serif"
            w="full"
            overflowX="hidden"
            _dark={{ bg: "gray.900" }} 
        >
            <PageTopbar/>
            
            <Container maxWidth="8xl" mt={20}>
                <Box p={4}>{children}</Box>
            </Container>

            <PageFooter/>
        </Box>
    );
}