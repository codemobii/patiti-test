import {
  Avatar,
  Box,
  Center,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Button from "./Button";
import { MdClose, MdEdit } from "react-icons/md";
import useMembers from "../hooks/useMember";
import AddEditModal from "./AddEditModal";

export default function MemberDetails({ handleHideDetails }) {
  const { singleMember, onRemove } = useMembers();
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Stack spacing={"20px"} pos="relative" bg="#F6F7FB" p="20px" py="40px">
        <Flex pos="absolute" top="0" left="0" w="100%" p="20px">
          <IconButton
            onClick={onOpen}
            icon={<MdEdit />}
            bg="#000"
            color="#fff"
            rounded={"0"}
          />

          <Spacer />

          <IconButton
            onClick={handleHideDetails}
            icon={<MdClose />}
            bg="#000"
            color="#fff"
            rounded={"0"}
          />
        </Flex>

        <Center>
          <Avatar
            src={singleMember?.avatar}
            size={"2xl"}
            name="John Chimaobi"
          />
        </Center>

        <Text fontSize={"lg"} fontWeight="600" textAlign={"center"}>
          {singleMember?.first_name + " " + singleMember?.last_name}
        </Text>

        <Table variant="striped">
          <Tbody>
            <Tr>
              <Td>Email</Td>
              <Td isNumeric>{singleMember?.email}</Td>
            </Tr>

            <Tr>
              <Td>Phone</Td>
              <Td isNumeric>{singleMember?.phone}</Td>
            </Tr>

            <Tr>
              <Td>City</Td>
              <Td isNumeric>{singleMember?.city}</Td>
            </Tr>

            <Tr>
              <Td>State</Td>
              <Td isNumeric>{singleMember?.state}</Td>
            </Tr>

            <Tr>
              <Td>Country</Td>
              <Td isNumeric>{singleMember?.country}</Td>
            </Tr>
          </Tbody>
        </Table>

        <Center>
          <Button
            onClick={() => {
              onRemove(singleMember);
              handleHideDetails();
            }}
            bg="red"
          >
            Remove Employee
          </Button>
        </Center>
      </Stack>

      <AddEditModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}
