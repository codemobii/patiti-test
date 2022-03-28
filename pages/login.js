import { Box, Center, Container, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(data.email, data.password);
  };

  return (
    <Center h="100vh" w="100%" bg="#F6F7FB">
      <Container maxW={"450px"}>
        <Stack
          as="form"
          onSubmit={handleSubmit}
          w="100%"
          spacing={"40px"}
          p={6}
          py={8}
          bg="#fff"
        >
          <Box>
            <Text fontWeight={"600"} fontSize="2xl">
              Welcome Back
            </Text>
            <Text fontWeight={"400"} fontSize="md">
              Sign in to continue
            </Text>
          </Box>

          <Stack spacing={"30px"}>
            <Input
              name="email"
              label="Email address"
              value={data?.email}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              value={data?.password}
              onChange={handleChange}
            />
          </Stack>

          <Box>
            <Button type="submit">Login</Button>
          </Box>
        </Stack>
      </Container>
    </Center>
  );
}
