import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import axios from "axios";
import { addMessage } from "../features/chat/chatSlice";

const Chat = () => {
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat ?? ""
  );
  const messages = useSelector(
    (state: RootState) => state.chat.messages[selectedChat || ""] || []
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    console.log("Selected chat before sending message:", selectedChat);

    if (!selectedChat || !message) return;

    const chatId = selectedChat.includes("@c.us")
      ? selectedChat
      : `${selectedChat}@c.us`;

    console.log("Formatted chatId:", chatId);

    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const data = {
      chatId: chatId,
      message,
    };

    try {
      await axios.post(url, data);
      dispatch(
        addMessage({
          contact: selectedChat,
          message: { sender: "You", text: message },
        })
      );
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to receive messages
  const receiveMessages = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.body) {
        const incomingMessage =
          response.data.body.messageData?.textMessageData?.textMessage;
        const senderNumber = response.data.body.senderData?.chatId?.replace(
          "@c.us",
          ""
        );

        if (incomingMessage && senderNumber === selectedChat) {
          dispatch(
            addMessage({
              contact: selectedChat,
              message: { sender: "Friend", text: incomingMessage },
            })
          );
        }
        // Delete notification after processing
        if (response.data.receiptId) {
          await deleteNotification(response.data.receiptId);
        }
      }
    } catch (error) {
      console.error("Error receiving message:", error);
    }
  };

  const deleteNotification = async (receiptId: string) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

    try {
      await axios.delete(url);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  return (
    <div>
      <h3>Chat with {selectedChat}</h3>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          borderBottom: "1px solid #ddd",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
