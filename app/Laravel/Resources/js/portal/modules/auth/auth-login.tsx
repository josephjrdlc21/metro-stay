import AuthLayout from "@portal/layouts/auth-layout"
import AppNotification from "@portal/components/app-notification"
import { Button } from "@chakra-ui/react"
import { Card } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Heading } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { Center } from "@chakra-ui/react"
import { Field, Input } from "@chakra-ui/react"
import { Stack } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { FaEnvelopeOpen } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { FormEvent } from "react"
import { Link } from "@inertiajs/react"
import { useForm }from "@inertiajs/react"
import { Head } from "@inertiajs/react"
import { useRoute } from "@ziggy"
import { usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

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
                <>
                    <Card.Body gap="2">
                        {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                            <Icon as={FaEnvelopeOpen} boxSize={7} color="cyan.600" />
                            <Heading size="3xl" color="gray.700">MetroStay</Heading>
                        </Box>
                        <Text textStyle="sm" textAlign="center" my={4} color="gray.500">Glad to see you again <br/> Login to your account below</Text>
                        <Center>
                            <Button w={'full'} variant={'outline'}>
                                <Center gap={2}>
                                    <FcGoogle />
                                    <Text color="gray.700">Sign in with Google</Text>
                                </Center>
                            </Button>
                        </Center>
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
                                    <Button type="submit" bg="cyan.600" disabled={processing}>
                                        {processing ?  <Spinner />  : "Login"}
                                    </Button>
                                </Stack>
                            </form>
                        </Center>
                    </Card.Body>
                    <Card.Footer>
                        <Center w="100%">
                            <Link href="#">
                                <Text textStyle="sm" color="cyan.600">Forgot Password?</Text>
                            </Link>
                        </Center>
                    </Card.Footer>
                </>
            </Card.Root>
        </AuthLayout> 
    )
}