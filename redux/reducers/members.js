import {
  ADD_MEMBER,
  DELETE_MEMBER,
  SINGLE_MEMBER,
  UPDATE_MEMBER,
} from "../constants";

const initialState = {
  members: [],
  singleMember: null,
};

export default function membersReducers(state = initialState, action) {
  switch (action.type) {
    case ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, action.payload.item],
      };

    case DELETE_MEMBER:
      //   remove item from members
      const newmembers = state.members.filter((item) => {
        return item.id !== action.payload.item.id;
      });
      return {
        ...state,
        members: newmembers,
      };

    case UPDATE_MEMBER:
      let updated = state.members;
      const index = state.members.findIndex(
        (obj) => obj.id == action.payload.item.id
      );

      updated[index] = action.payload.item;

      return {
        ...state,
        members: updated,
      };

    case SINGLE_MEMBER:
      const findSingleMemberIndex = state.members.findIndex(
        (obj) => obj.id == action.payload?.item?.id
      );

      return {
        ...state,
        singleMember: state.members[findSingleMemberIndex] || null,
      };

    default:
      return state;
  }
}
