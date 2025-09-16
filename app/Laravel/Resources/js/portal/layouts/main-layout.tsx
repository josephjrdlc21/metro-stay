import AppSidebar from "@portal/components/app-sidebar"
import AppTopbar from "@portal/components/app-topbar"
import AppFooter from "@portal/components/app-footer"
import { SidebarProvider } from "@portal/context/sidebar-context"
import { Box } from "@chakra-ui/react"
import { Flex } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export default function MainLayout({ children }: PropsWithChildren){
    return(
        <SidebarProvider>
            <Flex 
                minH="100vh" 
                fontFamily="'Roboto', sans-serif"
                w="100vw"
                overflowX="hidden"
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