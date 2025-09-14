import { Box } from "@chakra-ui/react"
import { AbsoluteCenter } from "@chakra-ui/react"

import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren){
    return(
        <Box w="100%" h="100vh" position="relative" 
            bgImage={`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'><path fill='%230891b2' fill-opacity='1' d='M0,192L34.3,176C68.6,160,137,128,206,128C274.3,128,343,160,411,181.3C480,203,549,213,617,208C685.7,203,754,181,823,160C891.4,139,960,117,1029,106.7C1097.1,96,1166,96,1234,122.7C1302.9,149,1371,203,1406,229.3L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z'/></svg>")`}
            bgRepeat="no-repeat"
            bgSize="cover"
        >
            <AbsoluteCenter w="100%" px="4">
                {children}
            </AbsoluteCenter>
        </Box>
    );
}