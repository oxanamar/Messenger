import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store/store";
import { addContact, selectChat } from "../../features/chat/chatSlice";
import { useEffect, useRef, useState } from "react";
import { clearAuth } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../shared/assets/defaultavatar.webp";
import { FaSearch, FaEllipsisV, FaPlus } from "react-icons/fa";
import s from "./ContactList.module.scss";
import Modal from "../../shared/Modal/Modal";

interface Contact {
  name: string;
  phoneNumber: string;
}

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.chat.contacts);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(contacts);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFilteredContacts(
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, contacts]);

  // Logout function
  const handleLogout = () => {
    dispatch(clearAuth());
    localStorage.removeItem("idInstance");
    localStorage.removeItem("apiTokenInstance");
    navigate("/");
  };

  const handleAddContact = () => {
    if (!name || !phoneNumber) {
      alert("Please enter both name and phone number.");
      return;
    }

    dispatch(addContact({ name, phoneNumber }));
    setName("");
    setPhoneNumber("");
    setShowModal(false);
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div className={s.container}>
      {/* Contacts Header */}
      <div className={s.header}>
        <h3>Chats</h3>
        <div className={s.menu}>
          <FaPlus className={s.icon} onClick={() => setShowModal(true)} />

          <FaEllipsisV
            className={s.icon}
            onClick={() => setShowMenu((prev) => !prev)}
          />

          {/* Dropdown Menu */}
          {showMenu && (
            <div ref={menuRef} className={s.menuDropdown}>
              <button onClick={handleLogout} className={s.logoutButton}>
                Log out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className={s.searchBar}>
        <FaSearch className={s.searchIcon} />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={s.searchInput}
        />
      </div>

      {/* Contact List */}
      <div className={s.contactList}>
        {filteredContacts.map((contact) => (
          <div
            key={contact.phoneNumber}
            className={s.contactItem}
            onClick={() => dispatch(selectChat(contact.phoneNumber))}
          >
            <img src={defaultAvatar} alt="Avatar" className={s.avatar} />
            <span>{contact.name}</span>
          </div>
        ))}
      </div>

      {/* Add Contact Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Add Contact"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={s.input}
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={s.input}
        />
        <div className={s.modalButtons}>
          <button onClick={handleAddContact} className={s.createButton}>
            Create
          </button>
          <button
            onClick={() => setShowModal(false)}
            className={s.cancelButton}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ContactList;
