import React from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();
  // BEM naming convention
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="app_body">
              <Sidebar />
              <Routes>
                <Route path="/room/:roomId" element={<Chat />} />
                <Route
                  path="/"
                  element={
                    <h1>Welcome!! Click on one of the channels on the left.</h1>
                  }
                />
              </Routes>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
