import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store/store";
import axios from "axios";
import { addMessage } from "../../features/chat/chatSlice";
import defaultAvatar from "../../shared/assets/defaultavatar.webp";

// ✅ Configure Green API for receiving messages
const configureGreenAPI = async (
  idInstance: string,
  apiTokenInstance: string
) => {
  const url = `https://api.green-api.com/waInstance${idInstance}/setSettings/${apiTokenInstance}`;

  const settingsData = {
    webhookUrl: "",
    outgoingWebhook: "yes",
    stateWebhook: "yes",
    incomingWebhook: "yes",
  };

  try {
    const response = await axios.post(url, settingsData);
    console.log("✅ Green API configured:", response.data);
  } catch (error) {
    console.error("❌ Error configuring Green API:", error);
  }
};

const Chat = () => {
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );
  const contacts = useSelector((state: RootState) => state.chat.contacts);
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat ?? ""
  );
  const messages = useSelector(
    (state: RootState) => state.chat.messages[selectedChat || ""] || []
  );
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  // ✅ Get Contact Name or Show Number
  const contactInfo = contacts.find((c) => c.phoneNumber === selectedChat);
  const contactName = contactInfo ? contactInfo.name : selectedChat;

  // ✅ Send a message
  const sendMessage = async () => {
    console.log("Selected chat before sending message:", selectedChat);

    if (!selectedChat || !message) return;

    const chatId = selectedChat.includes("@c.us")
      ? selectedChat
      : `${selectedChat}@c.us`;

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
          message: {
            sender: "You",
            text: message,
            timestamp: new Date().toLocaleTimeString(),
          },
        })
      );
      setMessage("");
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  // ✅ Receive messages
  const receiveMessages = async () => {
    const url = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

    try {
      const response = await axios.get(url);
      console.log("📥 FULL Green API Response:", response.data); // Debugging log

      if (!response.data || !response.data.body) {
        console.log("❌ No new messages received");
        return;
      }

      // ✅ Extract message data correctly
      const messageData = response.data.body.messageData;
      const textMessage = messageData?.textMessageData?.textMessage;
      const senderNumber = response.data.body.senderData?.chatId?.replace(
        "@c.us",
        ""
      );

      console.log("📩 Extracted Message:", textMessage);
      console.log("📩 Sender Number:", senderNumber);

      // ✅ Ignore messages from group chats (`@g.us`)
      if (senderNumber.includes("@g.us")) {
        console.log(`🚫 Ignored group message from: ${senderNumber}`);
        return;
      }

      // ✅ Extract clean phone number (remove "@c.us")
      const senderPhoneNumber = senderNumber.replace("@c.us", "");

      // ✅ Filter: Only allow messages from saved contacts
      const savedContacts = contacts.map((contact) => contact.phoneNumber);
      if (!savedContacts.includes(senderPhoneNumber)) {
        console.log(
          `🚫 Ignored message from unknown sender: ${senderPhoneNumber}`
        );
        return;
      }

      // ✅ If the message is valid, store it in Redux
      if (textMessage && senderPhoneNumber) {
        dispatch(
          addMessage({
            contact: senderPhoneNumber,
            message: {
              sender: "Friend",
              text: textMessage,
              timestamp: new Date().toLocaleTimeString(),
            },
          })
        );
      }

      // ✅ Delete notification after processing
      if (response.data.receiptId) {
        await deleteNotification(response.data.receiptId);
      }
    } catch (error) {
      console.error("❌ Error receiving message:", error);
    }
  };

  // ✅ Delete processed messages from Green API
  const deleteNotification = async (receiptId: string) => {
    if (!receiptId) {
      console.warn("⚠️ No receiptId provided for deletion");
      return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

    try {
      await axios.delete(url);
      console.log(`🗑️ Deleted notification with receiptId: ${receiptId}`);
    } catch (error) {
      console.error("❌ Error deleting notification:", error);
    }
  };

  // ✅ Configure Green API and start fetching messages
  useEffect(() => {
    if (idInstance && apiTokenInstance) {
      configureGreenAPI(idInstance, apiTokenInstance);
    }
  }, [idInstance, apiTokenInstance]);

  // ✅ Continuously check for new messages
  useEffect(() => {
    const fetchMessages = async () => {
      await receiveMessages();
    };

    fetchMessages(); // ✅ Fetch immediately when chat is selected

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedChat]);

  return (
    <div>
      {/* ✅ Chat Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <img
          src={defaultAvatar} // Fallback avatar
          alt="Avatar"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h3>{contactName}</h3>
      </div>
      <div
        style={{
          height: "400px",
          overflowY: "auto",
          borderBottom: "1px solid #ddd",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "You" ? "#DCF8C6" : "#EAEAEA",
              padding: "8px",
              borderRadius: "10px",
              margin: "5px",
              maxWidth: "60%",
              textAlign: "left",
            }}
          >
            <b>{msg.sender}:</b> {msg.text}
            <div
              style={{
                fontSize: "0.75rem",
                textAlign: "right",
                color: "gray",
                marginTop: "5px",
              }}
            >
              {msg.timestamp}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px" }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
