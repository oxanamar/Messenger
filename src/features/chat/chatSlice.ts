import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  name: string;
  phoneNumber: string;
}

interface Message {
  sender: string;
  text: string;
}

interface ChatState {
  contacts: Contact[];
  selectedChat: string | null; // Selected contact
  messages: Record<string, Message[]>; // Messages grouped by contact
}

// const initialState: ChatState = {
//   contacts: [
//     { name: "John Doe", phoneNumber: "77071112233" },
//     { name: "Jane Smith", phoneNumber: "1234567890" },
//   ], // Example contacts
//   selectedChat: null,
//   messages: {},
// };

const loadFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return null;
  }
};

const initialState: ChatState = {
  contacts: loadFromLocalStorage("contacts") || [],
  selectedChat: null,
  messages: loadFromLocalStorage("messages") || {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      localStorage.setItem("contacts", JSON.stringify(state.contacts)); // ✅ Save contacts
    },
    selectChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{ contact: string; message: Message }>
    ) => {
      if (!state.messages[action.payload.contact]) {
        state.messages[action.payload.contact] = [];
      }
      state.messages[action.payload.contact].push(action.payload.message);
      localStorage.setItem("messages", JSON.stringify(state.messages)); // ✅ Save messages
    },
  },
});

export const { addContact, selectChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
