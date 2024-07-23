import { createSlice } from "@reduxjs/toolkit";

// Function to load initial state from session storage
export const loadSessionStore = () => {
  if (typeof window !== "undefined") {
    console.log("inside this");
    const storedUserData = sessionStorage.getItem("userData");
    return storedUserData
      ? JSON.parse(storedUserData)
      : { name: "UserName", token: "", message: "" };
  }
  return { name: "UserName", token: "", message: "" };
};

const userSlice = createSlice({
  name: "users",
  initialState: loadSessionStore(), // Load initial state from session storage
  reducers: {
    setUserDetails: (state, { payload }) => {
      // console.log("payload :", payload);
      state.userData = { ...payload };
      setSessionStore(state);
    },
    setLogout: (state) => {
      state.userData = { name: "UserName", token: "", message: "" };
    },
    reload: (state) => {
      state.userData = loadSessionStore();
    },
  },
});

// Function to save state to session storage
const setSessionStore = (state) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("userData", JSON.stringify(state.userData));
  }
};

export const { setUserDetails, setLogout, reload } = userSlice.actions;

export default userSlice.reducer;
