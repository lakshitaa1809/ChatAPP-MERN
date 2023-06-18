import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "./axios";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Pusher from "pusher-js";
const App = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/find").then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);
  useEffect(() => {
    const pusher = new Pusher("48316281dd4ad140e510", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
};

export default App;
