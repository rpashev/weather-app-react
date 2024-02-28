import axios from "axios";
// import { LoginInputState } from "../pages/Login";
import { RegisterInputState } from "../pages/Register";

export default {
  //   login(inputs: LoginInputState) {
  //     return axios.post(`${import.meta.env.VITE_APP_BASE_URL}auth/login`, {
  //       email: inputs.email,
  //       password: inputs.password,
  //     });
  //   },

  register(formState: RegisterInputState) {
    return axios.post(`${import.meta.env.VITE_APP_BASE_URL}auth/signup`, {
      ...formState,
    });
  },
};
