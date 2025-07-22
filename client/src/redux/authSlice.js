// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: null,
//     suggestedUsers: [],
//     userProfile: null,
//     selectedUser: null,
//   },
//   reducers: {
//     // actions
//     setAuthUser: (state, action) => {
//       state.user = action.payload;
//     },
//     setSuggestedUsers: (state, action) => {
//       state.suggestedUsers = action.payload;
//     },
//     setUserProfile: (state, action) => {
//       state.userProfile = action.payload;
//     },
//     setSelectedUser: (state, action) => {
//       state.selectedUser = action.payload;
//     },
//   },
// });
// export const {
//   setAuthUser,
//   setSuggestedUsers,
//   setUserProfile,
//   setSelectedUser,
// } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    suggestedUsers: [],
    userProfile: null,
    selectedUser: null,
  },
  reducers: {
    // actions
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },

    // ✅ New reducers to update followers/following in-place
    addFollowerToProfile: (state, action) => {
      if (!state.userProfile.followers.includes(action.payload)) {
        state.userProfile.followers.push(action.payload);
      }
    },
    removeFollowerFromProfile: (state, action) => {
      state.userProfile.followers = state.userProfile.followers.filter(
        (id) => id !== action.payload
      );
    },
    addFollowingToUser: (state, action) => {
      if (!state.user.following.includes(action.payload)) {
        state.user.following.push(action.payload);
      }
    },
    removeFollowingFromUser: (state, action) => {
      state.user.following = state.user.following.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setAuthUser,
  setSuggestedUsers,
  setUserProfile,
  setSelectedUser,
  addFollowerToProfile,
  removeFollowerFromProfile,
  addFollowingToUser,
  removeFollowingFromUser,
} = authSlice.actions;

export default authSlice.reducer;
