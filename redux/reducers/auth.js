import { LOGIN, REGISTER } from "../constants";

const initialState = {
  token: null,
  email: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
      };

    default:
      return state;
  }
}
