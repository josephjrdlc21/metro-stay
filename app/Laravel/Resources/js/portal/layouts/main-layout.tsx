import AppSidebar from "@portal/components/app-sidebar";
import AppTopbar from "@portal/components/app-topbar";
import { SidebarProvider } from "@portal/context/SidebarContext";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren){
    return(
        <SidebarProvider>
            <Flex minH="100vh" fontFamily="'Roboto', sans-serif">
                {/* Sidebar */}
                <AppSidebar />
                {/* Main content area */}
                <Flex direction="column" flex="1">
                    {/* Topbar */}
                    <AppTopbar />
                    {/* Page content */}
                    <Box flex="1" p={4} bg="gray.100" rounded="xl">
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </SidebarProvider>
    );
}