import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    tasks: taskSlice,
    user: userSlice,
  },
});

export default store;
