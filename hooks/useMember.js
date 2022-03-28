import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_MEMBER,
  DELETE_MEMBER,
  SINGLE_MEMBER,
  UPDATE_MEMBER,
} from "../redux/constants";

export default function useMembers() {
  const { members, singleMember } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const [filteredData, setFilteredData] = useState(null);

  const onAdd = (item) => {
    dispatch({
      type: ADD_MEMBER,
      payload: { item },
    });

    alert("Member added");
  };

  const onRemove = (item) => {
    dispatch({
      type: DELETE_MEMBER,
      payload: { item },
    });

    alert("Member deleted");
  };

  const onUpdate = (item) => {
    dispatch({
      type: UPDATE_MEMBER,
      payload: { item },
    });

    alert("Member updated");
  };

  const getSingleMember = (item) => {
    dispatch({
      type: SINGLE_MEMBER,
      payload: { item },
    });
  };

  const onSearch = (filter) => {
    const filteredMembers = members.filter((member) => {
      return (
        member.first_name.toLowerCase().includes(filter.toLowerCase()) ||
        member.last_name.toLowerCase().includes(filter.toLowerCase())
      );
    });

    setFilteredData(filteredMembers);
  };

  const filterByCountry = (filter) => {
    const filteredMembers = members.filter((member) => {
      return member.country.toLowerCase().includes(filter.toLowerCase());
    });

    setFilteredData(filteredMembers);
  };

  const filterByState = (filter) => {
    const filteredMembers = members.filter((member) => {
      return member.state.toLowerCase().includes(filter.toLowerCase());
    });

    setFilteredData(filteredMembers);
  };

  return {
    members,
    onAdd,
    onRemove,
    onUpdate,
    getSingleMember,
    onSearch,
    filteredData,
    singleMember,
    filterByCountry,
    filterByState,
    clearFilter: () => setFilteredData(members),
  };
}
