import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // load from localStorage, fallback true if nothing is saved
  isExpanded: JSON.parse(localStorage.getItem("sidebarExpanded")) ?? true,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
      // persist in localStorage
      localStorage.setItem("sidebarExpanded", JSON.stringify(state.isExpanded));
    },
    setSidebar: (state, action) => {
      state.isExpanded = action.payload;
      localStorage.setItem("sidebarExpanded", JSON.stringify(state.isExpanded));
    },
  },
});

export const { toggleSidebar, setSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
