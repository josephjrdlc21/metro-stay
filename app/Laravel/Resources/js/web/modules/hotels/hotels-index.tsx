import { FormEvent } from "react"
import { Head, useForm } from "@inertiajs/react"
import { useRoute } from "@ziggy"

import { priceFormat, quantityFormat } from "@web/utils/helper"

import MainLayout from "@web/layouts/main-layout"
import AppPagination from "@web/components/app-pagination"
import { Heading, Text, Box, Flex, Image, RatingGroup, Stack,
    Badge, Separator, Link, Grid, Field, Input, HStack,
    Button,} from "@chakra-ui/react"

import { RiSearch2Line, RiResetRightLine} from "react-icons/ri"

interface Values {
    page_title: string,
    keyword: string
    record: {
        data: any[],
        links: any[],
    }
}

type FormValues = {
    keyword: string
}

export default function HotelsIndex({ values }: { values: Values }){
    const route = useRoute();

    const { data, setData, processing, get } = useForm<FormValues>({
        keyword: values.keyword ?? ''
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        get(route('web.hotels.index'));
    };

    return (
        <MainLayout>
            <Head title={values.page_title}/>
            <Box mt={10}>
                <Heading size="4xl">Hotel Rooms</Heading>
                <Text color="gray.500" my={4}>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</Text>
            </Box>

            <form onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(1, 1fr)" }} gap={3} mb={3}>
                    <Field.Root>
                        <Field.Label>Search</Field.Label>
                        <Input name="name" placeholder="e.g., Name, Bed Type" value={data.keyword} onChange={e => setData('keyword', e.target.value)}/>
                    </Field.Root>
                </Grid>

                <HStack>
                    <Button colorPalette="cyan" variant="solid" size="sm" type="submit" loading={processing}>
                        <RiSearch2Line /> Filter
                    </Button>
                    {processing ? (
                        <Button colorPalette="gray" variant="solid" size="sm" disabled>
                            <RiResetRightLine /> Clear
                        </Button>
                    ) : (
                        <Link href={route("web.hotels.index")}>
                            <Button colorPalette="gray" variant="solid" size="sm">
                                <RiResetRightLine /> Clear
                            </Button>
                        </Link>
                    )}
                </HStack>
            </form>
            
            {values?.record?.data && values?.record?.data.length > 0 ? (
                (values?.record?.data.map)(type => (
                    <Box mt={10} key={type.id}>
                        <Flex gap="3" direction={{ base: "column", lg: "row"}}>
                            <Link href={route('web.hotels.book', type.id)} width="full">
                                <Image
                                    rounded="md"
                                    shadow="lg"
                                    height="220px"
                                    width="370px"
                                    src={`${type.directory}/${type.filename}`}
                                />
                            </Link>
                            <Box spaceY={2}>
                                <Text color="gray.500" textStyle="sm" fontWeight="medium">{type.name}</Text>
                                <Link href={route('web.hotels.book', type.id)}>
                                    <Text textStyle="xl">{type.bed_type}</Text>
                                </Link>
                                <Flex gap={2} align="center">
                                    <RatingGroup.Root count={5} defaultValue={3} size="sm" colorPalette="orange">
                                        <RatingGroup.HiddenInput />
                                        <RatingGroup.Control />
                                    </RatingGroup.Root>
                                    <Text textStyle="xs">200+ reviews</Text>
                                </Flex>
                                <Stack direction="row" mt={2}>
                                    <Badge>Max Guest {quantityFormat(type.capacity)}</Badge>
                                </Stack>
                                <Stack direction="row">
                                    {type.amenities.map((it: string, index: number) => (
                                        <Badge key={index}>{it}</Badge>
                                    ))}
                                </Stack>
                                <Text textStyle="sm" textAlign="justify">{type.description}</Text>
                                <Text textStyle="md" fontWeight="semibold">₱ {priceFormat(type.price)}</Text>
                            </Box>
                        </Flex>
                        <Separator my={5} />
                    </Box>
                ))
                ) : (
                <Text>No Available Hotel Room.</Text>
            )}
            <Box overflowX="auto" mt={4}>
                <AppPagination links = {values.record.links} />
            </Box>
        </MainLayout>
    );
}