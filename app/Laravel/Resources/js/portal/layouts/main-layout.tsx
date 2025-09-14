import AppSidebar from "@portal/components/app-sidebar";
import AppTopbar from "@portal/components/app-topbar";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren){
    return(
        <Flex minH="100vh" fontFamily="'Roboto', sans-serif">
            {/* Sidebar */}
            <AppSidebar />
            {/* Main content area */}
            <Flex direction="column" flex="1">
                {/* Topbar */}
                <AppTopbar />
                {/* Page content */}
                <Box flex="1" p={4} bg="gray.50">
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
}