import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import "./SidebarChat.css";
import axios from "../axios";
import { Link } from "react-router-dom";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please Enter Name for Chat");

    if (roomName) {
      try {
        await axios.post("/new/room", {
          name: roomName,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return !addNewChat ? (
    <Link to={`/room/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3 className="add-new-chat-title">Add New Chat</h3>
    </div>
  );
};

export default SidebarChat;
