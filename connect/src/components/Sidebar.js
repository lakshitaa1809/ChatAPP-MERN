import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar, IconButton } from "@mui/material";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import axios from "../axios";
import Pusher from "pusher-js";
const Sidebar = () => {
  const [{ user }] = useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get("/all/rooms").then((response) => setRooms(response.data));
  }, []);
  console.log(rooms);
  useEffect(() => {
    const pusher = new Pusher("48316281dd4ad140e510", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("room");
    channel.bind("inserted", function (room) {
      // alert(JSON.stringify(newMessage));
      setRooms((prevRooms) => [...prevRooms, room]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  return (
    <Sidebarcontainer>
      <Sidebarheader>
        <Avatar src={user.photoURL} />
        <Sidebarheaderright>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Sidebarheaderright>
      </Sidebarheader>
      <Sidebarsearch>
        <Search>
          <SearchIcon />
          <Input placeholder="Search in Chats" />
        </Search>
      </Sidebarsearch>

      <Sidechats>
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room._id} id={room._id} name={room.name} />
        ))}
      </Sidechats>
    </Sidebarcontainer>
  );
};
export default Sidebar;
const Sidebarcontainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.35;
`;
const Sidebarheader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-right: 1px solid lightgray;
  margin-right: 20px;
`;
const Sidebarheaderright = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  min-width: 10vw;
`;

const Sidebarsearch = styled.div`
  display: flex;
  align-items: center;
  background-color: #f6f6f6;
  height: 39px;
  padding: 10px;
  margin-left: 10px;
  margin-right: 30px;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: white;

  width: 100%;
  height: 25px;
  border-radius: 20px;
`;
const Input = styled.input`
  border: none;
  outline-width: 0;
  margin-left: 50px;
`;

const Sidechats = styled.div`
  width: 96%;
  flex: 1;
  background-color: white;
  overflow-y: scroll;
`;
