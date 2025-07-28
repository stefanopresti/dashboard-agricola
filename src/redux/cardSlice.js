import { createSlice } from "@reduxjs/toolkit";

export const cardSlice = createSlice({
  name: "cards",
  initialState: {
    value: [
      {
        image: "https://picsum.photos/600/400",
        title: "React",
        content: "A JavaScript library for building user interfaces.",
      },
      {
        image: "https://picsum.photos/600/400?random=1",
        title: "Vite",
        content: "A next-generation front-end tool that focuses on speed.",
      },
    ],
  },
  reducers: {
    addCard: (state, action) => {
      state.value.push({
        ...action.payload,
        id: Date.now(),
      });
    },
    removeCard: (state, action) => {
      return state.filter((card) => card.id !== action.payload.id);
    },
  },
});

export const { addCard, removeCard } = cardSlice.actions;

export default cardSlice.reducer;
