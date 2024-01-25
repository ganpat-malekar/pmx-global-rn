import { passwordStrength } from "check-password-strength";

export const passwordCheckMessage = (password) => {
  if (password !== "") {
    if (
      passwordStrength(password).value === "Too weak" ||
      passwordStrength(password).value === "Weak"
    ) {
      return (
        <span style={{ color: "red" }}>
          Your password is{" "}
          <span style={{ textTransform: "lowercase" }}>
            {passwordStrength(password).value}
          </span>
        </span>
      );
    } else if (passwordStrength(password).value === "Medium") {
      return (
        <span style={{ color: "orange" }}>
          Your password is{" "}
          <span style={{ textTransform: "lowercase" }}>
            {passwordStrength(password).value}
          </span>
        </span>
      );
    } else if (passwordStrength(password).value === "Strong") {
      return (
        <span style={{ color: "green" }}>
          Your password is{" "}
          <span style={{ textTransform: "lowercase" }}>
            {passwordStrength(password).value}
          </span>
        </span>
      );
    }
  }
};

export const getColor = (password) => {
  if (password !== "") {
    if (
      passwordStrength(password).value === "Too weak" ||
      passwordStrength(password).value === "Weak"
    ) {
      return "error";
    } else if (passwordStrength(password).value === "Medium") {
      return "warning";
    } else if (passwordStrength(password).value === "Strong") {
      return "success";
    }
  } else {
    return "primary";
  }
};
