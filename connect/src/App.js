import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { useStateValue } from "./components/StateProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const App = () => {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Routes>
              <Route>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route path="/" element={<Chat />}></Route>
              </Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
