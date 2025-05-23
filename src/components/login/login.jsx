import React, { useState } from "react";
import brandlogo from "../../constants/main-logo/brandlogo.jpg";
import { Input } from "../../ui";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailure, signUserStart, signUserSucces } from "../../slice/auth";
import { ValidationError } from ".././";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import "../register/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSucces(response.data.user))
     
      navigate("/");
    } catch (error) {
      dispatch(signUserFailure(error.response.data.errors))
      console.log("Error with userLogin:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form className="auth-form">
          <div className="auth-header">
            <img className="auth-logo" src={brandlogo} alt="Brand Logo" />
            <h1 className="auth-title">Please login</h1>
          </div>
          
          <div className="validation-error-container">
            <ValidationError />
          </div>

          <div className="auth-inputs">
            <Input
              label="Email"
              type="email"
              formId={"floatingEmail"}
              marginTop={"0"}
              state={email}
              setState={setEmail}
            />

            <Input
              label="Password"
              type="password"
              formId={"floatingPassword"}
              marginTop={"16px"}
              state={password}
              setState={setPassword}
            />
          </div>

          <button
            className="auth-button"
            disabled={isLoading}
            onClick={(e) => loginHandler(e)}
            type="submit"
          >
            {isLoading ? (
              <>
                <span>Loading...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
          
          <p className="auth-footer">© by Radjabov 2025</p>
        </form>
      </div>
    </div>
  );
};

export default Login;