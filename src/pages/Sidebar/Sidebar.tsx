import { FaComments, FaUsers, FaCog } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { CiStreamOn } from "react-icons/ci";
import defaultAvatar from "../../shared/assets/defaultavatar.webp";
import s from "./Sidebar.module.scss";

const Sidebar = () => {
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
        <img src={defaultAvatar} alt="Profile" className={s.avatar} />
      </div>
    </div>
  );
};

export default Sidebar;
