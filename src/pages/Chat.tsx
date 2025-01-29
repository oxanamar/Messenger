import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import axios from "axios";
import { addMessage, setPhoneNumber } from "../features/chat/chatSlice";

const Chat = () => {
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );
  const { phoneNumber, messages } = useSelector(
    (state: RootState) => state.chat
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const data = {
      chatId: `${phoneNumber}@c.us`,
      message,
    };

    try {
      await axios.post(url, data);
      dispatch(addMessage(`You: ${message}`));
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

        if (incomingMessage) {
          dispatch(addMessage(`Friend: ${incomingMessage}`));
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

  // Function to delete received notification
  const deleteNotification = async (receiptId: string) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;
    try {
      await axios.delete(url);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Polling for new messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(receiveMessages, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div>
      <h2>WhatsApp Chat</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
      />
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
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
