import {Button, Flex, Stack} from "@chakra-ui/react";
import { Input } from "../components/Form/Input";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'

type SignInFormData = {
    email: string,
    password: string
}
const signInFormSchema = yup.object().shape({
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória')
})
export default function SignIn() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema)
    })
    const { errors } = formState
    
    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log(values)
    }

    return (
        <Flex w="100vw" h="100vh" alignItems="center" justifyContent="center">

            <Flex as="form" width="100%" maxWidth={360} bg="gray.800" p="8"
                  borderRadius={8} flexDir={"column"} onSubmit={handleSubmit(handleSignIn)}>
                <Stack spacing={"4"}>
                    <Input type={"email"} name={"email"} label={"E-mail"}
                        {...register("email")}
                        error={errors.email}></Input>
                    <Input name={"password"} type={"password"} label={"Password"}
                        {...register("password")}
                        error={errors.password}></Input>
                    <Button type={"submit"} mt={"6"} colorScheme={"pink"} size={"lg"} isLoading={formState.isSubmitting}>Entrar</Button>
                </Stack>
            </Flex>

        </Flex>


    )
}
