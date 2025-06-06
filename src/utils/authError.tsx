type AuthErrorCode =
  | "auth/missing-email"
  | "auth/invalid-email"
  | "auth/user-disabled"
  | "auth/user-not-found"
  | "auth/missing-password"
  | "auth/invalid-password"
  | "auth/wrong-password"
  | "auth/too-many-requests"
  | "auth/email-already-in-use"
  | "auth/operation-not-allowed"
  | "auth/weak-password"
  | "auth/credential-already-in-use"
  | "auth/account-exists-with-different-credential"
  | "auth/user-token-expired"
  | "auth/invalid-credential"
  | "auth/popup-closed-by-user"
  | "auth/popup-blocked"
  | "auth/display-name-already-in-use";

type AuthErrorResult = {
  message: string;
  field: string;
};

const authError = (error: { code: AuthErrorCode }): AuthErrorResult => {
  switch (error.code) {
    case "auth/missing-email":
      return { message: "Please enter your email.", field: "email" };
    case "auth/invalid-email":
      return { message: "Invalid email address.", field: "email" };
    case "auth/user-disabled":
      return { message: "User account is disabled.", field: "email" };
    case "auth/user-not-found":
      return { message: "Email not found.", field: "email" };
    case "auth/missing-password":
      return { message: "Missing password.", field: "password" };
    case "auth/invalid-password":
      return { message: "Invalid password.", field: "password" };
    case "auth/wrong-password":
      return { message: "Incorrect password.", field: "password" };
    case "auth/too-many-requests":
      return { message: "Too many requests. Please try again later.", field: "email" };
    case "auth/email-already-in-use":
      return { message: "This email address is already in use.", field: "email" };
    case "auth/operation-not-allowed":
      return { message: "This operation is not allowed.", field: "email" };
    case "auth/weak-password":
      return { message: "The password is too weak.", field: "password" };
    case "auth/credential-already-in-use":
      return {
        message: "This credential is already associated with another account.",
        field: "email",
      };
    case "auth/account-exists-with-different-credential":
      return {
        message:
          "An account already exists with the same email address but different sign-in credentials.",
        field: "email",
      };
    case "auth/user-token-expired":
      return { message: "Your session has expired. Please log in again.", field: "email" };
    case "auth/invalid-credential":
      return { message: "The provided credential is invalid.", field: "password" };
    case "auth/popup-closed-by-user":
      return { message: "The popup was closed before completing the sign-in.", field: "email" };
    case "auth/popup-blocked":
      return { message: "The popup was blocked by the browser.", field: "email" };
    case "auth/display-name-already-in-use":
      return { message: "This display name is already in use.", field: "displayName" };
    default:
      return { message: "An unknown error occurred.", field: "email" };
  }
};

export default authError;
