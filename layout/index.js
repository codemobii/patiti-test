import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Router from "next/router";
import React from "react";
import { MdDashboard, MdLogout, MdPersonAdd } from "react-icons/md";
import AddEditModal from "../components/AddEditModal";
import Logo from "../components/Logo";
import useAuth from "../hooks/useAuth";

export default function DashboardLayout({ children, pageTitle = "Dashboard" }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { token, logout } = useAuth();

  if (!token) {
    Router.push("/login");
  }

  return (
    <>
      <Grid w="100%" overflow={"hidden"} templateColumns="repeat(5, 1fr)">
        <GridItem colSpan={1} bg="#000">
          <Flex
            h="100vh"
            p="20px"
            py="40px"
            flexDir={"column"}
            justify="space-between"
          >
            <Stack spacing={"50px"}>
              <Logo />

              <Stack spacing={"30px"} color="#fff">
                <Link>
                  <HStack align={"center"}>
                    <MdDashboard />
                    <Text>Dashboard</Text>
                  </HStack>
                </Link>

                <Link onClick={onOpen}>
                  <HStack align={"center"}>
                    <MdPersonAdd />
                    <Text>Add Employee</Text>
                  </HStack>
                </Link>

                <Link onClick={logout}>
                  <HStack align={"center"}>
                    <MdLogout />
                    <Text>Logout</Text>
                  </HStack>
                </Link>
              </Stack>
            </Stack>

            <Text color={"#fff"}>Version 1.0</Text>
          </Flex>
        </GridItem>

        <GridItem px="20px" overflowX={"hidden"} colSpan={4}>
          <Stack w="100%" spacing={"50px"} py="20px">
            <Text fontSize={"2xl"} fontWeight="600">
              {pageTitle}
            </Text>

            <Box w="100%">{children}</Box>
          </Stack>
        </GridItem>
      </Grid>

      <AddEditModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
