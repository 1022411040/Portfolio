import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  isAuthenticated: false,
  loading: true,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearAuth(state) {
      state.admin = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setAdmin, clearAuth, setLoading } = adminSlice.actions;
export default adminSlice.reducer;
