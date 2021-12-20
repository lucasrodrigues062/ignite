import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
    showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
    return (
        <Flex align={"center"}>
            {showProfileData && (
                <Box mr={"4"} textAlign={"right"}>
                    <Text>Lucas rodrigues</Text>
                    <Text color={"gray.300"} fontSize={"small"}>lucasrodrigues062@gmail.com</Text>
                </Box>
            )}

            <Avatar size={"md"} name={"Lucas Rodrigues"} src={"https://github.com/lucasrodrigues062.png"} />
        </Flex>
    )
}