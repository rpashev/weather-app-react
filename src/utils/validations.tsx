export const validateEmail = (value: string) => {
  let regex = /\S+@\S+\.\S+/;
  if (regex.test(value) === false || value === "") {
    return false;
  } else {
    return true;
  }
};
