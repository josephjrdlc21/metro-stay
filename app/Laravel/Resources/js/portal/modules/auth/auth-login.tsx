import { FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, Link, useForm, usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import AuthLayout from "@portal/layouts/auth-layout"
import AppNotification from "@portal/components/app-notification"
import {Box, Button, Card, Center, Field, Heading, Icon, Input,
    Spinner, Stack, Text, Flex, Checkbox} from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { FaEnvelopeOpen } from "react-icons/fa"
// import { FcGoogle } from "react-icons/fc"
import { PiHandWaving } from "react-icons/pi"

interface PageProps extends InertiaPageProps{
    flash: any
}

export default function AuthLogin({ values }: { values: any }){
    const route = useRoute();

    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('portal.auth.login'))
    };

    return (
        <AuthLayout>
            <Head title={values.page_title}/>
            <Card.Root w="100%" maxW={{ base: "100%", md: "550px", lg: "480px" }} shadow="md">
                <Card.Body gap="2">
                    {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                        <Icon as={FaEnvelopeOpen} boxSize={7} color="cyan.600" />
                        <Heading size="3xl" color="gray.700" _dark={{ color: "gray.200" }}>MetroStay</Heading>
                    </Box>
                    <Text textStyle="sm" textAlign="center" my={4} color="gray.500" _dark={{ color: "gray.300" }}>
                        Glad to see you again <Icon as={PiHandWaving} boxSize={4} color="yellow.600" /> <br/> Login to your admin account below.                        </Text>
                    {/* <Center>
                        <Button w={'full'} variant={'outline'}>
                            <Center gap={2}>
                                <FcGoogle />
                                <Text color="gray.700">Sign in with Google</Text>
                            </Center>
                        </Button>
                    </Center> */}
                    <Center mt={4}>
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Stack spaceY="4" w="100%">
                                <Field.Root>
                                    <Field.Label>
                                        Email <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input placeholder="Enter your email" value={data.email} onChange={e => setData('email', e.target.value)}/>
                                </Field.Root>
                                <Field.Root>
                                    <Field.Label>
                                        Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <PasswordInput placeholder="*********" value={data.password}  onChange={e => setData('password', e.target.value)}/>
                                </Field.Root>

                                <Flex justify="space-between" gap={2} my={2}>
                                    <Checkbox.Root size={"sm"}>
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>Remember Me</Checkbox.Label>
                                    </Checkbox.Root>

                                    <Link href="#">
                                        <Text textStyle="sm">Forgot Password?</Text>
                                    </Link>
                                </Flex>

                                <Button type="submit" bg="cyan.600" disabled={processing}>
                                    {processing ?  <Spinner />  : "Login"}
                                </Button>
                            </Stack>
                        </form>
                    </Center>
                </Card.Body>
            </Card.Root>
        </AuthLayout> 
    )
}