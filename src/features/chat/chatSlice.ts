import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Contact {
  name: string;
  phoneNumber: string;
  avatarUrl?: string;
}

interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatState {
  contacts: Contact[];
  selectedChat: string | null;
  messages: Record<string, Message[]>;
}

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
      localStorage.setItem("contacts", JSON.stringify(state.contacts));
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
      localStorage.setItem("messages", JSON.stringify(state.messages));
    },
    updateContactAvatar: (
      state,
      action: PayloadAction<{ phoneNumber: string; avatarUrl: string }>
    ) => {
      const contact = state.contacts.find(
        (c) => c.phoneNumber === action.payload.phoneNumber
      );
      if (contact) {
        contact.avatarUrl = action.payload.avatarUrl;
        localStorage.setItem("contacts", JSON.stringify(state.contacts));
      }
    },
  },
});

export const { addContact, selectChat, addMessage, updateContactAvatar } =
  chatSlice.actions;
export default chatSlice.reducer;
