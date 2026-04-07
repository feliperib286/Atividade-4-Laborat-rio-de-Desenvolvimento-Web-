import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: { users: [] as string[] },
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user !== action.payload);
    }
  }
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;