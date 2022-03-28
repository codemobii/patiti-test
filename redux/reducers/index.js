import { combineReducers } from "redux";
import authReducers from "../reducers/auth";
import membersReducers from "./members";

const appReducer = combineReducers({
  auth: authReducers,
  members: membersReducers,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "logout") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
