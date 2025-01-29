import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  idInstance: string;
  apiTokenInstance: string;
}

const initialState: AuthState = {
  idInstance: localStorage.getItem("idInstance") || "",
  apiTokenInstance: localStorage.getItem("apiTokenInstance") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.idInstance = action.payload.idInstance;
      state.apiTokenInstance = action.payload.apiTokenInstance;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
