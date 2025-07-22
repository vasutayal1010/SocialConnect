import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "stories",
  initialState: { allStories: [], loading: false },
  reducers: {
    setStories: (state, action) => {
      state.allStories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setStories, setLoading } = storySlice.actions;
export default storySlice.reducer;
