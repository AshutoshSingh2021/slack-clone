import React from "react";
import "./ChatInput.css";
import { useState } from "react";
import db from "./Firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase/compat/app";
// import firebase from "./Firebase";

function ChatInput({ channelName, channelId }) {
  const [input, setInput] = useState("");
  const [{ user }] = useStateValue();

  const sendMessage = (e) => {
    e.preventDefault();

    if (channelId) {
      db.collection("rooms").doc(channelId).collection("message").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        user: user.displayName,
        userImage: user.photoURL,
      });
    }
    setInput("");
  };

  return (
    <div className="chatInput">
      <form>
        <input
          className="inputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message to #${channelName?.toLowerCase()}`}
          defaultValue=""
        />
        <button type="submit" onClick={sendMessage}>
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
