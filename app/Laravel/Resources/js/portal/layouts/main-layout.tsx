import { PropsWithChildren } from "react"

import { SidebarProvider } from "@portal/context/sidebar-context"

import AppSidebar from "@portal/components/app-sidebar"
import AppTopbar from "@portal/components/app-topbar"
import AppFooter from "@portal/components/app-footer"
import { Box, Flex } from "@chakra-ui/react"

export default function MainLayout({ children }: PropsWithChildren){
    return(
        <SidebarProvider>
            <Flex 
                minH="100vh" 
                fontFamily="'Roboto', sans-serif"
                w="full"
                overflowX="hidden"
                _dark={{ bg: "gray.900" }} 
            >
                {/* Sidebar */}
                <AppSidebar />
                {/* Main content area */}
                <Flex 
                    direction="column" 
                    flex="1" minW={0}
                >
                    {/* Topbar */}
                    <AppTopbar />
                    {/* Page content */}
                    <Box 
                        flex="1" p={4}
                        _dark={{ bg: "black" }} 
                        bg="gray.100" rounded="xl" 
                        minW={0}
                    >
                        {children}
                    </Box>
                    {/* Footer */}
                    <AppFooter/>
                </Flex>
            </Flex>
        </SidebarProvider>
    );
}