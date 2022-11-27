export const makeValidationObj = (minLength: number, pattern?: RegExp, emailErrMsg?: string) => {
  return {
    required: 'this field is required',
    minLength: {
      value: minLength,
      message: `you must enter at least ${minLength} letters`,
    },
    pattern: pattern
      ? {
          value: pattern,
          message: emailErrMsg ?? '',
        }
      : undefined,
  };
};
