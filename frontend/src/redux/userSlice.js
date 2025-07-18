import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Admin",
  image: "",
  organization: "Your Org", // ✅ Add this line
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
      }
      if (action.payload.image !== undefined) {
        state.image = action.payload.image;
      }
      if (action.payload.organization !== undefined) {
        state.organization = action.payload.organization;
      }
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
