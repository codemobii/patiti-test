import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
} from "@chakra-ui/react";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";
import axios from "axios";
import useMembers from "../hooks/useMember";
import { v4 as uuidv4 } from "uuid";

export default function AddEditModal({ isOpen = false, onClose }) {
  const { onAdd, singleMember, onUpdate, getSingleMember } = useMembers();

  const [data, setData] = useState({
    avatar: singleMember?.avatar,
    first_name: singleMember?.first_name,
    last_name: singleMember?.last_name,
    email: singleMember?.email,
    phone: singleMember?.phone,
    city: singleMember?.city,
    state: singleMember?.state,
    country: singleMember?.country,
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    // get url from file
    const url = URL.createObjectURL(e.target.files[0]);
    setData({ ...data, avatar: url });
  };

  useEffect(() => {
    const getCountries = async () => {
      await axios
        .get("https://countriesnow.space/api/v0.1/countries/states")
        .then((res) => {
          setCountries(res.data.data);

          if (singleMember) {
            setData(singleMember);
            // Set states based on singleMember country

            const country = countries.find(
              (c) => c.name === singleMember.country
            );
            setStates(country.states);
          } else {
            setData({
              avatar: singleMember?.avatar,
              first_name: singleMember?.first_name,
              last_name: singleMember?.last_name,
              email: singleMember?.email,
              phone: singleMember?.phone,
              city: singleMember?.city,
              state: singleMember?.state,
              country: singleMember?.country,
            });
          }
        })
        .catch((er) => {
          console.log("Error at getCountries", er);
        });
    };

    getCountries();
  }, [singleMember]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (singleMember) {
      onUpdate({ ...data, id: singleMember.id });
      getSingleMember(null);
    } else {
      onAdd({ ...data, id: uuidv4() });
    }

    setData({});

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit} rounded={"0"}>
        <ModalHeader>Add Employee</ModalHeader>
        <ModalCloseButton rounded={"0"} />
        <ModalBody>
          <Stack spacing={"20px"}>
            <Input
              label="Avatar"
              name="avatar"
              type="file"
              onChange={handleUpload}
            />
            <Input
              label="First name"
              name="first_name"
              value={data.first_name}
              onChange={handleChange}
            />
            <Input
              label="Last name"
              name="last_name"
              value={data.last_name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <Input
              label="Phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
            />
            <Input
              label="City"
              name="city"
              value={data.city}
              onChange={handleChange}
            />

            <Select
              label="Country"
              value={data.country}
              name="country"
              onChange={(e) => {
                const country = countries.find(
                  (c) => c.name === e.target.value
                );
                setStates(country.states);

                handleChange(e);
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
              value={data.state}
              onChange={handleChange}
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
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button bg="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="ghost">
            Complete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
