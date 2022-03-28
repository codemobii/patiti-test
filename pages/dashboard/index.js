import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import MemberDetails from "../../components/MemberDetails";
import Select from "../../components/Select";
import useMembers from "../../hooks/useMember";
import DashboardLayout from "../../layout";

export default function Dashboard() {
  const {
    members,
    getSingleMember,
    singleMember,
    onSearch,
    filteredData,
    filterByCountry,
    filterByState,
    clearFilter,
  } = useMembers();

  const [showDetails, setShowDetails] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const data = filteredData || members;

  const handleShowDetails = (item) => {
    getSingleMember(item);
    setShowDetails(true);
  };

  useEffect(() => {
    const getCountries = async () => {
      await axios
        .get("https://countriesnow.space/api/v0.1/countries/states")
        .then((res) => {
          setCountries(res.data.data);
        })
        .catch((er) => {
          console.log("Error at getCountries", er);
        });
    };

    getCountries();
  }, []);

  return (
    <DashboardLayout>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem transition={"all 0.3s ease"} colSpan={showDetails ? 3 : 5}>
          <Stack overflowY={"hidden"} w="100%">
            <HStack pt="20px">
              <Input
                label="Search"
                w="300px"
                onChange={(e) => {
                  onSearch(e.target.value);
                }}
              />

              <HStack w="50%">
                <Select
                  label="Country"
                  name="country"
                  onChange={(e) => {
                    const country = countries.find(
                      (c) => c.name === e.target.value
                    );
                    setStates(country?.states);
                    filterByCountry(e.target.value);
                  }}
                  placeholder="Select country"
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Select>

                <Select
                  onChange={(e) => {
                    filterByState(e.target.value);
                  }}
                  name="state"
                  label="State"
                  placeholder="Select state"
                >
                  {states?.map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </Select>

                <Button onClick={clearFilter} w="150px">
                  Clear
                </Button>
              </HStack>
            </HStack>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>S/N</Th>
                  <Th>Full name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Address</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((i, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>
                      <HStack>
                        <Avatar size={"xs"} src={i.avatar} />
                        <Text>{i?.first_name + " " + i?.last_name}</Text>
                      </HStack>
                    </Td>
                    <Td>{i?.email}</Td>
                    <Td>{i?.phone}</Td>
                    <Td>
                      {i?.city} {i?.state}, {i?.country}
                    </Td>
                    <Td>
                      <Button
                        onClick={() => {
                          handleShowDetails(i);
                        }}
                      >
                        View
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Stack>
        </GridItem>

        <GridItem
          transition={"all 0.3s ease"}
          colSpan={showDetails ? 2 : 0}
          d={singleMember && showDetails ? "block" : "none"}
        >
          <MemberDetails handleHideDetails={() => setShowDetails(false)} />
        </GridItem>
      </Grid>
    </DashboardLayout>
  );
}
