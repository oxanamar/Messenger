import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import { addContact, selectChat } from "../features/chat/chatSlice";
import { useState } from "react";

const ContactList = () => {
  const contacts = useSelector((state: RootState) => state.chat.contacts);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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

  return (
    <div>
      {/* Contacts Header with Add Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Contacts</h3>
        <button onClick={() => setShowModal(true)}>➕</button>
      </div>

      {/* Contact List */}
      {contacts.map((contact) => (
        <div
          key={contact.phoneNumber}
          style={{
            padding: "10px",
            cursor: "pointer",
            borderBottom: "1px solid #ddd",
          }}
          onClick={() => {
            console.log(`Selected chat: ${contact.phoneNumber}`);
            dispatch(selectChat(contact.phoneNumber));
          }}
        >
          {contact.name} ({contact.phoneNumber})
        </div>
      ))}

      {/* Add Contact Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Add Contact</h3>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "5px",
              width: "100%",
            }}
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "5px",
              width: "100%",
            }}
          />
          <button onClick={handleAddContact} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default ContactList;
