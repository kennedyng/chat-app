import * as Yup from "yup";

export const PasswordValidation = Yup.string()
  .required("No password provided.")
  .min(8, "Password is too short - should be 8 chars minimum.")
  .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

export const EmailValidation = Yup.string()
  .email("Invalid email address")
  .required("Required");
