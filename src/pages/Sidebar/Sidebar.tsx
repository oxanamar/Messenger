import { FaComments, FaUsers, FaCog } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { CiStreamOn } from "react-icons/ci";
import defaultAvatar from "../../shared/assets/defaultavatar.webp";
import s from "./Sidebar.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store/store";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const contacts = useSelector((state: RootState) => state.chat.contacts);
  const { idInstance, apiTokenInstance } = useSelector(
    (state: RootState) => state.auth
  );

  const [avatarUrl, setAvatarUrl] = useState<string>(defaultAvatar);

  const contactInfo = contacts.find((c) => c.phoneNumber === selectedChat);

  // Fetch avatar from Green API
  const fetchAvatar = async (chatId: string) => {
    try {
      const url = `https://api.green-api.com/waInstance${idInstance}/getAvatar/${apiTokenInstance}`;
      const response = await axios.post(url, { chatId });

      if (response.data.available) {
        return response.data.urlAvatar || defaultAvatar;
      } else {
        return defaultAvatar;
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
      return defaultAvatar;
    }
  };

  // Load the avatar when selectedChat changes
  useEffect(() => {
    const loadAvatar = async () => {
      if (selectedChat) {
        const fetchedAvatar = await fetchAvatar(`${selectedChat}@c.us`);
        setAvatarUrl(fetchedAvatar);
      }
    };

    loadAvatar();
  }, [selectedChat, idInstance, apiTokenInstance, contactInfo]);

  return (
    <div className={s.sidebar}>
      <div className={s.icons}>
        <div className={s.iconWrapper}>
          <FaComments className={s.icon} />
        </div>
        <div className={s.iconWrapper}>
          <AiOutlineFieldTime className={s.icon} />
        </div>
        <div className={s.iconWrapper}>
          <CiStreamOn className={s.icon} />
        </div>
        <div className={s.iconWrapper}>
          <FaUsers className={s.icon} />
        </div>
      </div>

      <div className={s.bottomSection}>
        <div className={s.iconWrapper}>
          <FaCog className={s.icon} />
        </div>
        <img src={avatarUrl} alt="Profile" className={s.avatar} />
      </div>
    </div>
  );
};

export default Sidebar;
