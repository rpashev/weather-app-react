import { useInput } from '../hooks/useInput';
import { useLoginMutate } from '../hooks/tanstack-query/useLoginMutate';
import { validateEmail } from '../utils/validations';
import { useSettingsContext } from '../context/settings-context';

export const Login = () => {
  const { translations } = useSettingsContext();

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

  const formIsValid = passwordIsValid && emailIsValid;

  const { isPending, mutate } = useLoginMutate();

  const showEmailError = emailError || (isPending && !emailIsValid);
  const showPasswordError = passwordError || (isPending && !passwordIsValid);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ password, email });
  };

  return (
    <div className="mt-8 py-4 flex items-start justify-center max-container">
      <form
        onSubmit={submitHandler}
        className="w-80 rounded-lg px-5 py-4 pb-6 dark:text-slate-100 text-slate-800 sm:w-[25rem] bg-slate-100 dark:bg-slate-800"
      >
        <h2 className="mb-5 text-center text-3xl">{translations?.pages.login?.title}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">{translations?.pages.login?.email}</label>
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
                {translations?.pages.login?.errorEmail}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">{translations?.pages.login?.password}</label>
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
                {translations?.pages.login?.errorPassword}
              </p>
            )}
          </div>

          <button
            disabled={!formIsValid || isPending}
            className="ml-auto mt-3 rounded bg-amber-400 px-4 py-2 text-lg font-semibold tracking-wider text-slate-800
             transition-all enabled:hover:bg-amber-300 sm:w-[40%] 
             disabled:cursor-not-allowed disabled:opacity-70"
          >
            {translations?.pages.login?.submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};
