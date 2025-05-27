import { createSlice } from "@reduxjs/toolkit";

// Define default structure
const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  meta: '',
  instagram: '',
  linkedin: '',
  github: '',
  bio: '',
  profileImage: '',
};

// Load stored user or use defaults
const storedUser = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: storedUser ? { ...defaultUser, ...storedUser } : null,
  },
  reducers: {
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      // Merge and sync to localStorage
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const { setloading, logout, setUser } = authSlice.actions;
export default authSlice.reducer;