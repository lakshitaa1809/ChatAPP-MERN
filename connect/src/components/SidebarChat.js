import React from "react";
import { Avatar } from "@mui/material";
import styled from "styled-components";
const SidebarChat = () => {
  return (
    <Container>
      <UserAvatar />
      <HeadingTwoText>name</HeadingTwoText>
      <Paragraph>Msg</Paragraph>
    </Container>
  );
};
export default SidebarChat;
const Container = styled.div`
  display: flex;
  padding: 5px;
  cursor: pointer;
  border-bottom: 1px solid #f6f6f6;
  :hover {
    background-color: #d5d5d5;
   
  }
`;
const HeadingTwoText = styled.h2`
  position: relative;
  left: 8px;
  bottom: 20px;
`;
const Paragraph = styled.p`
  position: relative;
  right: 45px;
  top: 15px;
`;
const UserAvatar = styled(Avatar)`
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
