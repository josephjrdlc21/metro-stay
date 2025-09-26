import { Flex, Button, Icon, Link } from "@chakra-ui/react"
import { Link as Page } from "@inertiajs/react"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
}

export default function AppPagination({ links }: PaginationProps) {
    return (
        <Flex as="nav" aria-label="pagination" gap={1} justify={"center"}>
            {links.map((link, idx) => {
                const label = link.label
                    .replace("&raquo;", "")
                    .replace("&laquo;", "")
                    .trim();

                const isPrev = idx === 0;
                const isNext = idx === links.length - 1;

                if (!link.url) {
                    return (
                        <Button
                            key={idx}
                            size="xs"
                            disabled
                            variant="outline"
                        >
                            {isPrev ? (
                                <Icon as={BiChevronLeft} />
                            ) : isNext ? (
                                <Icon as={BiChevronRight} />
                            ) : (
                                label
                            )}
                        </Button>
                    );
                }

                return (
                    <Link
                        as={Page}
                        href={link.url}
                        key={idx}
                        _hover={{ textDecoration: "none" }}
                    >
                        <Button
                            size="xs"
                            variant={link.active ? "solid" : "outline"}
                            colorPalette="cyan"
                        >
                            {isPrev && <Icon as={BiChevronLeft} />}
                            {!isPrev && !isNext && label}
                            {isNext && <Icon as={BiChevronRight} />}
                        </Button>
                    </Link>
                );
            })}
        </Flex>
    );
}
