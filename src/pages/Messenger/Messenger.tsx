import ContactList from "../../pages/ContactList/ContactList";
import Chat from "../../pages/Chat/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import s from "./Messenger.module.scss";
import Sidebar from "../Sidebar/Sidebar";

const Messenger = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  return (
    <div className={s.messengerContainer}>
      <Sidebar />

      <div className={s.contactList}>
        <ContactList />
      </div>

      <div className={s.chatArea}>
        {selectedChat ? <Chat /> : <p>Select a contact to start chatting</p>}
      </div>
    </div>
  );
};

export default Messenger;
