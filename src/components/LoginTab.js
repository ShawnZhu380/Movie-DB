import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { userLogoutAction } from "../Actions/MovieAction";
import confirm from "antd/es/modal/confirm";

const Login = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  font-size: 1.5rem;
`;

const LoginButton = styled.button`
  &:hover {
    background-color: white;
    color: #01b4e4;
    border: 1px solid #01b4e4;
  }
`;

export default function LoginTag() {
  const movieState = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  const handleUsernameClick = () => {
    if (window.confirm("Do you want to Logout?") === true) {
      dispatch(userLogoutAction());
    } 
  };

  const LoginOrNot = () => {
    if (!movieState.isLoggedin) {
      return <Link to={`/login`}>Login</Link>;
    } else {
      return (
        <LoginButton onClick={handleUsernameClick}>
          {movieState.username}
        </LoginButton>
      );
    }
  };
  return <Login>{LoginOrNot()}</Login>;
}
