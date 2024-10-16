import { configureStore } from "@reduxjs/toolkit";
import messagesReducer from "./slice/messageSlice";

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
  },
});
