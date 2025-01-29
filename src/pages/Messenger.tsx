import ContactList from "./ContactList";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";

const Messenger = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar - Contact List */}
      <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
        <ContactList />
      </div>

      {/* Right Chat Area */}
      <div style={{ flex: 1 }}>
        {selectedChat ? <Chat /> : <p>Select a contact to start chatting</p>}
      </div>
    </div>
  );
};

export default Messenger;
