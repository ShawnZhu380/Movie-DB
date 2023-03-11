import React from "react";
import styled from "styled-components";
import { TABS } from "../constants";
import { Link } from "react-router-dom";

const TabsContainer = styled.ul`
  display: flex;
`;

const Tab = styled.li`
  list-style: none;
  margin-left: 3rem;
  font-size: 1.5rem;
  /* ${(props) =>
    props.active &&
    `
    &::after {
      content: "";
      width: 100%;
      height: 5px;
      display: block;
      background-color: #01b4e4;
    }
  `} */
`;

export default function Tabs() {
  const tabs = Object.values(TABS);
  return (
    <TabsContainer>
      {tabs.map((tab) => {
        if (tab.value === "HOME") {
          return (
            <Tab key={tab.value}>
              <Link to="/">{tab.value}</Link>
            </Tab>
          );
        } else {
          return (
            <Tab key={tab.value}>
              <Link to={`/${tab.title}`}>{tab.value}</Link>
            </Tab>
          );
        }
      })}
    </TabsContainer>
  );
}
