import MainLayout from "@portal/layouts/main-layout"
import AppNotification from "@portal/components/app-notification"
import { Card, Text, Box } from "@chakra-ui/react"
import { Heading, Separator } from "@chakra-ui/react"
import { Breadcrumb } from "@chakra-ui/react"
import { Flex, Stack } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Field, Input, NativeSelect } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import { FaTimes, FaRegPaperPlane  } from "react-icons/fa"
import { LuHouse } from "react-icons/lu"
import { Head } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { usePage, useForm } from "@inertiajs/react"
import { useRoute } from "@ziggy"
import { FormEvent } from "react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

interface PageProps extends InertiaPageProps{
    flash: any
}

export default function UsersCreate({ values }: { values: any }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('portal.users.create'))
    };

    return(
        <MainLayout>
            <Head title={values.page_title}/>

            <Card.Root size="sm">
                <Card.Body>
                    <Flex justify={{ base: "flex-start", md: "space-between" }} align="center" direction={{ base: "column", md: "row" }}>
                        <Heading _dark={{ color: "gray.300" }} color="gray.700" size="xl">Users</Heading>
                        <Breadcrumb.Root>
                            <Breadcrumb.List>
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">
                                        <LuHouse />
                                    </Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">Dashboard</Breadcrumb.Link>
                                </Breadcrumb.Item>  
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.Link href="#">Users</Breadcrumb.Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Separator />
                                <Breadcrumb.Item>
                                    <Breadcrumb.CurrentLink>Create User</Breadcrumb.CurrentLink>
                                </Breadcrumb.Item>
                            </Breadcrumb.List>
                        </Breadcrumb.Root>
                    </Flex>
                </Card.Body>
            </Card.Root>

            <Container maxW="3xl" mt={4} style={{padding: "0px"}}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Card.Root size="sm">
                        <Card.Header pb={2}>
                            <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Create user form</Heading>
                            <Text _dark={{ color: "gray.500" }} color="gray.500" textStyle="xs">Fill up the ( * ) required fields before submitting the form.</Text>
                            {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                        </Card.Header>
                        <Separator mt={2} mb={2} />
                        <Card.Body>
                            <Heading _dark={{ color: "gray.300" }} color="gray.700" size="md">Account Details</Heading>
                            <Stack gap={4} mt={4}>
                                <Field.Root orientation="horizontal" invalid={!!errors.name}>
                                    <Field.Label>Name <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="John Doe" value={data.name} onChange={e => setData('name', e.target.value)} flex="1"/>
                                        {errors.name && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal" invalid={!!errors.email}>
                                    <Field.Label>Email <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <Input placeholder="johndoe@example.com" value={data.email} onChange={e => setData('email', e.target.value)}/>
                                        {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
                                    </Box>
                                </Field.Root>

                                <Field.Root orientation="horizontal">
                                    <Field.Label>Roles <span style={{color: "red"}}>*</span></Field.Label>
                                    <Box flex="1">
                                        <NativeSelect.Root>
                                            <NativeSelect.Field>
                                                <option value="master_admin">Master Admin</option>
                                                <option value="receptionist">Receptionist</option>
                                            </NativeSelect.Field>
                                            <NativeSelect.Indicator />
                                        </NativeSelect.Root>
                                    </Box>
                                </Field.Root>
                            </Stack>
                        </Card.Body>
                        <Separator mt={4} mb={2} />
                        <Card.Footer display="flex" justifyContent="flex-end" pt={2} pb={4}>
                            <Link href={route('portal.users.index')}>
                                <Button variant="solid" colorPalette="red" size="sm">
                                    <FaTimes/> Cancel
                                </Button>
                            </Link>
                            <Button type="submit" variant="solid" colorPalette="cyan" size="sm" loading={processing}>
                                <FaRegPaperPlane/>  Submit
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </form>
            </Container>
        </MainLayout>
    );
}