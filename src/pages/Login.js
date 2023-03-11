import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
// import { Formik, Field, Form } from "formik";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { userLoginAction } from "../Actions/MovieAction";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.form`
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* flex-direction: column; */
  text-align: center;
`;

const Title = styled.div`
  font-size: 50px;
`;

const Error = styled.div`
  color: red;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [clickSubmit, setClickSubmit] = useState(false);
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitClick = () => {
    setClickSubmit(true);
    dispatch(userLoginAction(username, password));
  };

  useMemo(() => {
    navigate("/");
  }, [movieState.isLoggedin]);

  return (
    <FormContainer>
      <Title>Login</Title>
      <br />
      {clickSubmit && movieState.sessionId.length === 0 && (
        <Error>Failed to Login</Error>
      )}
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <br />
      {clickSubmit && username.length === 0 && (
        <Error>username is required</Error>
      )}
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      {clickSubmit && password.length === 0 && (
        <Error>password is required</Error>
      )}
      <Button type="primary" onClick={handleSubmitClick}>
        Submit
      </Button>
    </FormContainer>
  );
}
