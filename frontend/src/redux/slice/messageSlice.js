import { createSlice } from '@reduxjs/toolkit';

const initialState = { chats: [] };

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { chatIndex, message } = action.payload;
      if (!state.chats[chatIndex]) {
        state.chats[chatIndex] = [];
      }
      state.chats[chatIndex].push(message);
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    }
  }
});

export const { addMessage, setChats } = messageSlice.actions;
export default messageSlice.reducer;
