import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Input from "../components/Input";
import useInput from "../hooks/useInput";
import { hasMinLength, isEmail, isNotEmpty } from "../utils/Validation";

export default function Login() {
  const { theme } = useContext(ThemeContext);
  const cardColor = theme === "dark" ? "text-bg-dark" : "text-bg-light";
  const btnColor = theme === "dark" ? "light" : "dark";

  const {
    value: emailValue,
    handleInputBlur: handleEmailBlur,
    handleInputChange: handleEmailChange,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputBlur: handlePasswordBlur,
    handleInputChange: handlePasswordChange,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 5) && isNotEmpty(value));

  function handleFormSubmit(e) {
    e.preventDefault();
    if (emailHasError || passwordHasError) return;
  }

  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-7 mx-auto">
          <div className={`card border ${cardColor}`}>
            <div className="card-header">
              <h1 className="h4 mb-0">Login</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <Input
                  id="email"
                  labelText="Email"
                  name="email"
                  error={emailHasError && "Enter a valid email."}
                  type="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />

                <Input
                  id="password"
                  labelText="Password"
                  name="password"
                  error={
                    passwordHasError &&
                    "Password must be at least 5 characters."
                  }
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                />

                <button className={`btn btn-outline-${btnColor}`}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
