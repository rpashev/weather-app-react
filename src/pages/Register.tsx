import { useInput } from '../hooks/useInput';
import { useRegisterMutate } from '../hooks/tanstack-query/useRegisterMutate';
import { validateEmail } from '../utils/validations';
import { useSettingsContext } from '../context/settings-context';

export const Register = () => {
  const { translations } = useSettingsContext();

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
    <div className="mt-8 py-4 flex items-start justify-center max-container">
      <form
        onSubmit={submitHandler}
        className="w-80 rounded-lg px-5 py-4 pb-6 dark:text-slate-100 text-slate-800 sm:w-[25rem] bg-slate-100 dark:bg-slate-800"
      >
        <h2 className="mb-5 text-center text-3xl">{translations?.pages.signUp?.title}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">{translations?.pages.signUp?.email}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              className="tw-text-input"
            />
            {showEmailError && (
              <p className="text-[14px] tracking-wide text-red-400">
                {translations?.pages.signUp?.errorEmail}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">{translations?.pages.signUp?.password}</label>
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
                {translations?.pages.signUp?.errorPassword}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="repeatPassword">{translations?.pages.signUp?.repPassword}</label>
            <input
              type="password"
              className="tw-text-input"
              id="repeatPassword"
              value={repeatPassword}
              onChange={repeatPasswordChangeHandler}
              onBlur={repeatPasswordBlurHandler}
            />
            {showRepeatPasswordError && (
              <p className="text-[14px] tracking-wide text-red-400">
                {translations?.pages.signUp?.errorRepPassword}
              </p>
            )}
          </div>
          <button
            disabled={!formIsValid || isPending}
            className="ml-auto mt-3 rounded bg-amber-400 px-4 py-2 text-lg font-semibold tracking-wider text-slate-800
             transition-all enabled:hover:bg-amber-300 sm:w-[40%] 
             disabled:cursor-not-allowed disabled:opacity-70"
          >
            {translations?.pages.signUp?.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};
