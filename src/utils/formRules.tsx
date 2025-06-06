import type { Rule } from "antd/es/form";

export const rulesEmail: Rule[] = [
  {
    type: "email",
    message: "Please enter a valid email address",
  },
  {
    required: true,
    message: "Please enter your email",
  },
];

export const rulesPassword: Rule[] = [
  {
    required: true,
    message: "Please enter your password",
  },
  {
    min: 8,
    max: 20,
    message: "Password must be between 8 and 20 characters long",
  },
];

export const rulesConfirmPassword: Rule[] = [
  {
    required: true,
    message: "Please confirm your password",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The passwords you entered do not match"));
    },
  }),
];

export const rulesQuote: Rule[] = [
  {
    required: true,
    message: "Don't forget to add your quote!",
  },
];
