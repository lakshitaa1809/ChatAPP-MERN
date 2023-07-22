import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SearchIcon from "@mui/icons-material/Search";
import "./Chat.css";
import axios from "../axios";
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import Pusher from "pusher-js";
const Chat = () => {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [upDate, setUpDate] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();

  const [{ user }] = useStateValue();
  useEffect(() => {
    if (roomId) {
      axios.get(`/room/${roomId}`).then((response) => {
        setRoomName(response.data.name);
        setUpDate(response.data.updatedAt);
      });
      axios.get(`/messages/${roomId}`).then((response) => {
        setMessages(response.data);
      });
    }
  }, [roomId]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  const sendMessage = async (e) => {
    e.preventDefault();

    if (!input) {
      return;
    }

    await axios.post(`/messages/new`, {
      message: input,
      name: user.displayName,
      timestamp: new Date(),
      uid: user.uid,
      roomId,
    });

    setInput("");
  };

  useEffect(() => {
    const pusher = new Pusher("48316281dd4ad140e510", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (room) {
      setMessages((prevMessages) => [...prevMessages, room]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);
  console.log(roomName);
  return (
    <div className="chatContainer">
      <div className="chatHeader">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chatHeaderinfo">
          <h2>{roomName ? roomName : "Welcome to Connect via chat"}</h2>
          <p>
            {upDate
              ? `last seen at ${new Date(upDate).toString().slice(0, 25)}`
              : "click a group to start a chat"}
          </p>
        </div>
        <div className="chatHeaderright">
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chatBody">
        {messages.map((message, index) => (
          <p
            className={`chat_message ${
              message.uid === user.uid && "chat_receiver"
            }`}
            key={message?.id ? message?.id : index}
          >
            <span className="chat_name">{message.name}</span>
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp).toString().slice(0, 25)}
            </span>
          </p>
        ))}
      </div>
      {roomName && (
        <div className="chatFooter">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <button onClick={sendMessage} type="submit">
              Send{" "}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Chat;
