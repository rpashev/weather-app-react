import { ZodSchema } from 'zod';

// in else block doesn't throw an error, just a warning for the dev
export const zodParseResult = <T, S extends ZodSchema<any>>(response: T, schema: S) => {
  const validationResult = schema.safeParse(response);
  if (validationResult.success) {
    return validationResult.data;
  } else {
    console.warn('Data validation failed:', validationResult.error);
    return response;
  }
};
