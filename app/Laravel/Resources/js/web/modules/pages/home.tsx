import { Head } from "@inertiajs/react"

import PageLayout from "@web/layouts/page-layout"
import { Stack, Flex, Box, Heading, Text, Button, Image, Field, Input,
    Grid, Card, HStack, Badge, Avatar, RatingGroup} from "@chakra-ui/react"

interface Values {
    page_title: string,
}

export default function Index({ values }: { values: Values }){

    return (
        <PageLayout>
            <Head title={values.page_title}/>
            <Stack align="center"
                bgGradient="to-r" gradientFrom="white" gradientTo="blue.50"
                spaceX={{ base: 8, md: 10 }}
                spaceY={{ base: 8, md: 10 }}
                py={{ base: 20, md: 28 }}
                direction={{ base: 'column', md: 'row' }}
                rounded="lg"
                _dark={{
                    bgGradient: "none",
                    bg: "transparent",
                }}
            >
                <Stack flex={1} spaceY={{ base: 8, md: 10 }} transition="all 0.3s ease-in-out">
                    <Heading
                        lineHeight={1.1}
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
                    >
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: '30%',
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'cyan.600',
                                zIndex: -1,
                            }}>
                            Grand Escape
                        </Text>
                        <br />
                        <Text as={'span'} color={'cyan.600'}>
                            Dream Gateway
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        MetroStay is a modern hotel booking app. It helps you discover the best stays, manage your reservations, and check in with ease. 
                        All of this is free and available anywhere you go!
                    </Text>
                    <Stack spaceX={{ base: 2, sm: 4 }} direction={{ base: 'column', sm: 'row' }}>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                            colorScheme={'cyan'}
                            bg={'cyan.600'}
                            _hover={{ bg: 'cyan.400' }}
                        >
                            Get started
                        </Button>
                        <Button
                            rounded={'full'}
                            size={'lg'}
                            fontWeight={'normal'}
                            px={6}
                        >
                            How It Works
                        </Button>
                    </Stack>
                </Stack>
                <Flex 
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    w={'full'}>
                    <Box
                        position={'relative'}
                        height={'300px'}
                        rounded={'2xl'}
                        boxShadow={'2xl'}
                        width={'full'}
                        overflow={'hidden'}
                    >
                        <Image
                            alt={'Hero Image'}
                            fit={'cover'}
                            align={'center'}
                            w={'100%'}
                            h={'100%'}
                            shadow="md"
                            src={
                                'https://www.travelplusstyle.com/wp-content/uploads/2016/01/sonevajani-1880.jpg'
                            }
                        />
                    </Box>
                </Flex>
            </Stack>

            <Stack align="center" textAlign="center" mt={20}>
                <Heading>Featured Destination</Heading>
                <Text textStyle="sm" color="gray.500">Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.</Text>

                <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }} gap="3" mt={10}>
                    <Card.Root maxW="sm" overflow="hidden">
                        <Image
                            src="https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/qsj8vz0bptxfirwamtx5.png"
                            alt="hotel"
                        />
                        <Card.Body gap="2">
                            <Card.Title>Standard</Card.Title>
                            <Card.Description lineClamp="2">
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces.
                            </Card.Description>
                            <Text textStyle="xl" fontWeight="medium" mt="2">
                                ₱ 6,500
                            </Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="solid">Book Now</Button>
                        </Card.Footer>
                    </Card.Root>

                    <Card.Root maxW="sm" overflow="hidden">
                        <Image
                            src="https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/ogz2yswnysesa6xitjhf.png"
                            alt="hotel"
                        />
                        <Card.Body gap="2">
                            <Card.Title>Deluxe</Card.Title>
                            <Card.Description lineClamp="2">
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces.
                            </Card.Description>
                            <Text textStyle="xl" fontWeight="medium" mt="2">
                                ₱ 7,500
                            </Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="solid">Book Now</Button>
                        </Card.Footer>
                    </Card.Root>

                    <Card.Root maxW="sm" overflow="hidden">
                        <Image
                            src="https://res.cloudinary.com/djbvf02yt/image/upload/v1744266362/c0vrkkyf043awywcvowc.png"
                            alt="hotel"
                        />
                        <Card.Body gap="2">
                            <Card.Title>Premium</Card.Title>
                            <Card.Description lineClamp="2">
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces. This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces.
                            </Card.Description>
                            <Text textStyle="xl" fontWeight="medium" mt="2">
                                ₱ 5,555
                            </Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="solid">Book Now</Button>
                        </Card.Footer>
                    </Card.Root>

                    <Card.Root maxW="sm" overflow="hidden">
                        <Image
                            src="https://res.cloudinary.com/djbvf02yt/image/upload/v1744266363/tzez1p9xf1jkjk12laed.png"
                            alt="hotel"
                        />
                        <Card.Body gap="2">
                            <Card.Title>Executive</Card.Title>
                            <Card.Description lineClamp="2">
                                This sofa is perfect for modern tropical spaces, baroque inspired
                                spaces.
                            </Card.Description>
                            <Text textStyle="xl" fontWeight="medium" mt="2">
                                ₱ 4,450
                            </Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="solid">Book Now</Button>
                        </Card.Footer>
                    </Card.Root>
                </Grid>

                <Button mt={20} variant="outline">View All Hotels</Button>
            </Stack>

            <Stack align="center" textAlign="center" mt={20}>
                <Heading>Exclusive Offers</Heading>
                <Text textStyle="sm" color="gray.500">Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable memories.</Text>
                
                <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }} gap="3" mt={10}>
                    <Card.Root flexDirection={{ base: "column", lg: "row" }} overflow="hidden" w="full">
                        <Image
                            objectFit="cover"
                            maxW="200px"
                            src="https://img.freepik.com/free-photo/golden-sunset-tropical-beach-with-palm-trees_9975-32980.jpg?semt=ais_hybrid&w=740&q=80"
                            alt="offers"
                        />
                        <Box>
                            <Card.Body>
                                <Card.Title mb="2">Summer Escape Package</Card.Title>
                                <Card.Description>
                                    Book 60 days in advance and save on your stay at any of our luxury properties worldwide.
                                </Card.Description>
                                <HStack mt="4">
                                    <Badge>Expires Aug 31</Badge>
                                    <Badge>25% OFF</Badge>
                                </HStack>
                            </Card.Body>
                            <Card.Footer>
                                <Button>View Offers</Button>
                            </Card.Footer>
                        </Box>
                    </Card.Root>

                    <Card.Root flexDirection={{ base: "column", lg: "row" }} overflow="hidden" w="full">
                        <Image
                            objectFit="cover"
                            maxW="200px"
                            src="https://res.klook.com/image/upload/fl_lossy.progressive/q_auto/c_fill,w_750/w_1200/blogen/2018/04/image9.jpg"
                            alt="offers"
                        />
                        <Box>
                            <Card.Body>
                                <Card.Title mb="2">Luxury Retreat</Card.Title>
                                <Card.Description>
                                    Book 60 days in advance and save on your stay at any of our luxury properties worldwide.
                                </Card.Description>
                                <HStack mt="4">
                                    <Badge>Expires Sep 25</Badge>
                                    <Badge>30% OFF</Badge>
                                </HStack>
                            </Card.Body>
                            <Card.Footer>
                                <Button>View Offers</Button>
                            </Card.Footer>
                        </Box>
                    </Card.Root>
                </Grid>
            </Stack>

            <Stack align="center" textAlign="center" mt={20}>
                <Heading>What Our Guests Say</Heading>
                <Text textStyle="sm" color="gray.500">Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world.</Text>
                
                <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }} gap="3" mt={10}>
                    <Card.Root>
                        <Card.Body>
                            <Flex gap="4" align="center">
                                <Avatar.Root size="xl">
                                    <Avatar.Fallback name="Segun Adebayo" />
                                    <Avatar.Image src="https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />
                                </Avatar.Root>
                                <Text>Emma Rodriguez</Text>
                            </Flex>
                            <RatingGroup.Root count={5} defaultValue={3} size="sm" colorPalette="orange" mt={5}>
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                            <Text color="gray.500" mt={5}>
                                "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides. Their curated selection of hotels is unmatched."
                            </Text>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body>
                            <Flex gap="4" align="center">
                                <Avatar.Root size="xl">
                                    <Avatar.Fallback name="Segun Adebayo" />
                                    <Avatar.Image src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80" />
                                </Avatar.Root>
                                <Text>Liam Johnson</Text>
                            </Flex>
                            <RatingGroup.Root count={5} defaultValue={3} size="sm" colorPalette="orange" mt={5}>
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                            <Text color="gray.500" mt={5}>
                                "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides. Their curated selection of hotels is unmatched."
                            </Text>
                        </Card.Body>
                    </Card.Root>

                    <Card.Root>
                        <Card.Body>
                            <Flex gap="4" align="center">
                                <Avatar.Root size="xl">
                                    <Avatar.Fallback name="Segun Adebayo" />
                                    <Avatar.Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80" />
                                </Avatar.Root>
                                <Text>Sophia Lee</Text>
                            </Flex>
                            <RatingGroup.Root count={5} defaultValue={3} size="sm" colorPalette="orange" mt={5}>
                                <RatingGroup.HiddenInput />
                                <RatingGroup.Control />
                            </RatingGroup.Root>
                            <Text color="gray.500" mt={5}>
                                "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that QuickStay provides. Their curated selection of hotels is unmatched."
                            </Text>
                        </Card.Body>
                    </Card.Root>
                </Grid>
            </Stack>

            <Stack align="center" textAlign="center" mt={20}>
                <Card.Root bg="gray.800" textAlign="center" size="lg" p={{ base: "2", lg: "10"}} mx={2} _dark={{ bg: "gray.700"}}>
                    <Card.Body>
                        <Heading color="gray.200">Stay Inspired</Heading>
                        <Text textStyle="sm" color="gray.400" _dark={{ color: "gray.300"}}>Join our newsletter and be the first to discover new destinations, exclusive offers, and travel inspiration.</Text>

                        <Flex gap={2} mt={5} align="center" justify="center" direction={{ base: "column", lg: "row"}}>
                            <Field.Root w="250px">
                                <Input placeholder="Email" />
                            </Field.Root>
                            <Button>Subscribe</Button>
                        </Flex>

                        <Text textStyle="xs" color="gray.400" mt={5}>By subscribing, you agree to our Privacy Policy and consent to receive updates.</Text>
                    </Card.Body>
                </Card.Root>
            </Stack>
        </PageLayout>
    )
}