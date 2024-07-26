import { createSlice, configureStore } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: false,
  reducers: {
    logout(state) {
      return (state = false);
    },
    login(state) {
      return (state = true);
    },
  },
});
export const loginActions = loginSlice.actions;
export const store = configureStore({
  reducer: { loginFn: loginSlice.reducer },
});
