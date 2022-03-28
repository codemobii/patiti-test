import { useDispatch, useSelector } from "react-redux";
import { LOGIN, LOGOUT } from "../redux/constants";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";

export default function useAuth() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = async () => {
    dispatch({ type: LOGOUT });
  };

  const login = async (email, password) => {
    if (email === "colourjim@gmail.com" && password === "password") {
      dispatch({ type: LOGIN, payload: { token: uuidv4(), email: email } });
      Router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return {
    logout,
    login,
    token,
  };
}
