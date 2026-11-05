import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "checking",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authStateChanged: (state, action) => {
      state.user = action.payload;
      state.status = action.payload
        ? "authenticated"
        : "unauthenticated";

      state.error = null;
    },

    authError: (state, action) => {
      state.user = null;
      state.status = "unauthenticated";
      state.error = action.payload;
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const {
  authStateChanged,
  authError,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;