import { useInput } from '../hooks/useInput';
import { useRegisterMutate } from '../hooks/tanstack-query/useRegisterMutate';
import { validateEmail } from '../utils/validations';

export const Register = () => {
  const { isPending, mutate } = useRegisterMutate();

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
  } = useInput((value: string) => (value.length < 6 ? false : true));

  const {
    value: repeatPassword,
    hasError: repeatPasswordError,
    isValid: repeatPasswordIsValid,
    valueChangeHandler: repeatPasswordChangeHandler,
    inputBlurHandler: repeatPasswordBlurHandler,
  } = useInput((value: string) => (value.length < 6 ? false : true));

  const formIsValid = passwordIsValid && emailIsValid && password === repeatPassword;

  const showEmailError = emailError || (isPending && !emailIsValid);
  const showPasswordError = passwordError || (isPending && !passwordIsValid);
  const showRepeatPasswordError =
    repeatPasswordError ||
    (isPending && !repeatPasswordIsValid) ||
    (password !== repeatPassword && repeatPassword);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let firstName = 'N/A';
    let lastName = 'N/A';

    mutate({
      password,
      repeatPassword,
      email,
      firstName,
      lastName,
    });
  };

  return (
    <div className="mt-8 flex items-start justify-center">
      <form
        onSubmit={submitHandler}
        className="w-full rounded-lg bg-white px-5 py-4 pb-6 text-slate-100 sm:w-[25rem] dark:bg-slate-800"
      >
        <h2 className="mb-5 text-center text-3xl">Sign Up</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              className="tw-text-input"
            />
            {showEmailError && (
              <p className="text-[14px] tracking-wide text-red-400">Please enter a valid email!</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              className="tw-text-input"
            />
            {showPasswordError && (
              <p className="text-[14px] tracking-wide text-red-400">
                Password should be at least 6 symbols!
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="repeatPassword">Repeat password</label>
            <input
              type="password"
              className="tw-text-input"
              id="repeatPassword"
              value={repeatPassword}
              onChange={repeatPasswordChangeHandler}
              onBlur={repeatPasswordBlurHandler}
            />
            {showRepeatPasswordError && (
              <p className="text-[14px] tracking-wide text-red-400">Passwords should match!</p>
            )}
          </div>
          <button
            disabled={!formIsValid || isPending}
            className="ml-auto mt-3 rounded bg-cyan-600 px-4 py-2 text-lg font-semibold tracking-wider text-slate-100
             transition-all enabled:hover:bg-slate-100 enabled:hover:text-slate-600 sm:w-[40%] 
             disabled:cursor-not-allowed disabled:opacity-70"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
