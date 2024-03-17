import axios from 'axios';
import { type RegisterInputData } from '../common/types';
import { type LoginInputData } from '../common/types';

export default {
  login(inputs: LoginInputData) {
    return axios.post(`${import.meta.env.VITE_APP_BASE_URL}auth/login`, {
      email: inputs.email,
      password: inputs.password,
    });
  },

  register(formState: RegisterInputData) {
    return axios.post(`${import.meta.env.VITE_APP_BASE_URL}auth/signup`, {
      ...formState,
    });
  },
};
