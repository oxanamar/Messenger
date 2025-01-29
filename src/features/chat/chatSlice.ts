import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  phoneNumber: string;
  messages: string[];
}

const initialState: ChatState = { phoneNumber: "", messages: [] };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    addMessage: (state, action: PayloadAction<string>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setPhoneNumber, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
