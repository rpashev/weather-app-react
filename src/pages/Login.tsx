export const Login = () => {
  return <div>Login</div>;
};

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/user-context";
import { useInput } from "../hooks/use-input";
import { validateEmail } from "../utils/validations";

export type RegisterInputState = {
  email: string;
  password: string;
  repeatPassword?: string;
};

const Register = () => {
  const context = useContext(AuthContext);

  const {
    value: email,
    hasError: emailError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(validateEmail);

  const {
    value: password,
    hasError: passwordError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => (value.length < 6 ? false : true));

  const {
    value: repeatPassword,
    hasError: repeatPasswordError,
    isValid: repeatPasswordIsValid,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
  } = useInput((value) => (value.length < 6 ? false : true));

  const formIsValid =
    passwordIsValid && emailIsValid && password === repeatPassword;

  // const { isError, error, isLoading, mutate } = useMutation<
  //   any,
  //   AxiosError,
  //   RegisterInputState
  // >(api.register, {
  //   onSuccess: (res) => {
  //     context.login(res.data.token, res.data.userId);
  //     snackbarContext.showMessage("You registered successfully!");
  //   },
  // });

  // const showEmailError = emailError || (isLoading && !emailIsValid);
  // const showPasswordError = passwordError || (isLoading && !passwordIsValid);
  // const showRepeatPasswordError =
  //   repeatPasswordError ||
  //   (isLoading && !repeatPasswordIsValid) ||
  //   (password !== repeatPassword && repeatPassword);

  // let errorContent: any;
  // if (isError && error) {
  //   let err: any = error.response?.data;
  //   errorContent = err?.message || "Could not register!";
  // }

  // const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   mutate({ password, repeatPassword, firstName, lastName, email });
  // };

  return <div>yo</div>;
};
export default Register;
