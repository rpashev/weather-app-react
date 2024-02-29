export type ApiErrorResponse = {
  message: string;
};

export type LoginResponseData = {
  firstName: string;
  userId: string;
  token: string;
  journals: string[];
  email: string;
};
