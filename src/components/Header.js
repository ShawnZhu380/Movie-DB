import React from "react";
import Logo from "./Logo";
import styled from "styled-components";
import Tabs from "./Tabs";
import LoginTag from "./LoginTab";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Tabs />
      <LoginTag />
    </HeaderContainer>
  );
}
