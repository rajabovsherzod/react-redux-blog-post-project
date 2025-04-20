import React, { useState } from "react";
import brandlogo from "../../constants/main-logo/brandlogo.jpg";
import { Input } from "../../ui";
import { useSelector, useDispatch } from "react-redux";
import {
  signUserFailure,
  signUserStart,
  signUserSucces,
} from "../../slice/auth";
import { ValidationError } from "..";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/auth";
import "./auth.css"; // Loginni va Registerni bitta CSS faylda qilamiz

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const registerHandler = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { username: name, email, password };
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSucces(response.user));
      navigate("/");
    } catch (error) {
      console.log(error.response.data.errors);
      dispatch(signUserFailure(error.response.data.errors));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form className="auth-form">
          <div className="auth-header">
            <img className="auth-logo" src={brandlogo} alt="Brand Logo" />
            <h1 className="auth-title">Please sign up</h1>
          </div>
          
          <div className="validation-error-container">
            <ValidationError />
          </div>

          <div className="auth-inputs">
            <Input
              label="Email"
              formId={"floatingEmail"}
              type="email"
              state={email}
              setState={setEmail}
            />

            <Input
              label="Password"
              formId={"floatingPassword"}
              type="password"
              marginTop={"16px"}
              state={password}
              setState={setPassword}
            />

            <Input
              label="Username"
              formId={"floatingName"}
              marginTop={"16px"}
              state={name}
              setState={setName}
            />
          </div>

          <button
            className="auth-button"
            disabled={isLoading}
            onClick={(e) => registerHandler(e)}
            type="submit"
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                <span>Loading...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
          
          <p className="auth-footer">© by Radjabov 2025</p>
        </form>
      </div>
    </div>
  );
};

export default Register;