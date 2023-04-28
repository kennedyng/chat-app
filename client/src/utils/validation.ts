import * as Yup from "yup";

export const PasswordValidation = Yup.string()
  .required("No password provided.")
  .min(8, "Password is too short - should be 8 chars minimum.")
  .matches(/[a-zA-Z]/, "Password can only contain Latin letters.");

export const EmailValidation = Yup.string()
  .email("Invalid email address")
  .required("Required");

export const NameValidation = Yup.string()
  .max(20, "name must contain less than 20 characters")
  .min(2, "name must contain atleast two characters")
  .required("Required");

export const DescriptionValidation = Yup.string()
  .required("no description is provided")
  .min(24, "Meaningful Description with atleast 24 characters")
  .max(100, "description must contain with atleast 100 or less characters");
