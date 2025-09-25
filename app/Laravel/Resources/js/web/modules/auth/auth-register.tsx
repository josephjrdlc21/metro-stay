import { FormEvent } from "react"
import { useRoute } from "@ziggy"

import { Head, Link, useForm, usePage } from "@inertiajs/react"
import type { PageProps as InertiaPageProps } from "@inertiajs/core"

import AuthLayout from "@web/layouts/auth-layout"
import AppNotification from "@web/components/app-notification"
import {Box, Button, Card, Center, Field, Heading, Icon, Input,
    Spinner, Stack, Text} from "@chakra-ui/react"
import { PasswordInput } from "@/components/ui/password-input"
import { FaEnvelopeOpen } from "react-icons/fa"

interface PageProps extends InertiaPageProps{
    flash: any
}

interface Values {
    page_title: string
}

type FormValues = {
    name: string
    email: string
    phone_number: string
    password: string
    password_confirmation: string
}

export default function AuthRegister({ values }: { values: Values }){
    const route = useRoute();
    
    const { flash } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm<FormValues>({
        name: '',
        email: '',
        phone_number: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post(route('web.auth.register'))
    };

    return (
        <AuthLayout>
            <Head title={values.page_title}/>
            <Card.Root w="100%" maxW={{ base: "100%", md: "750px", lg: "650px" }} shadow="md">
                <Card.Body gap="2">
                    {flash.message && <AppNotification status={flash.status} title={flash.message}/>}
                    <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                        <Icon as={FaEnvelopeOpen} boxSize={7} color="cyan.600" />
                        <Heading size="3xl" color="gray.700">MetroStay</Heading>
                    </Box>
                    <Text textStyle="sm" textAlign="center" my={4} color="gray.500">
                        Register an Account
                    </Text>
                    <Center mt={4}>
                        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                            <Stack w="100%">
                                <Field.Root invalid={!!errors.name}>
                                    <Field.Label>
                                        Name <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input placeholder="Juan Dela cruz" value={data.name} onChange={e => setData('name', e.target.value)}/>
                                    {errors.email && <Field.ErrorText>{errors.name}</Field.ErrorText>}
                                </Field.Root>
                                <Field.Root invalid={!!errors.email}>
                                    <Field.Label>
                                        Email <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input placeholder="juandelacruz@example.com" value={data.email} onChange={e => setData('email', e.target.value)}/>
                                    {errors.email && <Field.ErrorText>{errors.email}</Field.ErrorText>}
                                </Field.Root>
                                <Field.Root invalid={!!errors.phone_number}>
                                    <Field.Label>
                                        Phone No. <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input placeholder="+63*********" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)}/>
                                    {errors.phone_number && <Field.ErrorText>{errors.phone_number}</Field.ErrorText>}
                                </Field.Root>
                                <Field.Root invalid={!!errors.password}>
                                    <Field.Label>
                                        Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <PasswordInput placeholder="*********" value={data.password}  onChange={e => setData('password', e.target.value)}/>
                                    {errors.password && <Field.ErrorText>{errors.password}</Field.ErrorText>}
                                </Field.Root>
                                <Field.Root invalid={!!errors.password_confirmation}>
                                    <Field.Label>
                                        Confirm Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <PasswordInput placeholder="*********" value={data.password_confirmation}  onChange={e => setData('password_confirmation', e.target.value)}/>
                                    {errors.password_confirmation && <Field.ErrorText>{errors.password_confirmation}</Field.ErrorText>}
                                </Field.Root>
                                <Button type="submit" bg="cyan.600" disabled={processing} mt={2}>
                                    {processing ?  <Spinner />  : "Register"}
                                </Button>
                                <Text textStyle="sm" my={2} textAlign="center">
                                    Already has an account? <Link href={route('web.auth.login')} style={{ color: "#0891b2"}}>Log in</Link>
                                </Text>
                            </Stack>
                        </form>
                    </Center>
                </Card.Body>
            </Card.Root>
        </AuthLayout>
    )
}