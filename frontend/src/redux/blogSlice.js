import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    loading: false,
    blog: [], // ✅ initialize as array
  },
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setBlog: (state, action) => {
      state.blog = action.payload; // ✅ properly set blog array
    }
  },
});

export const { setloading, setBlog } = blogSlice.actions;
export default blogSlice.reducer;