import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Habit { id: number; nome: string; categoria: string; }

const habitSlice = createSlice({
  name: 'habits',
  initialState: { list: [] as Habit[], filter: 'Todos' },
  reducers: {
    addHabit: (state, action: PayloadAction<Habit>) => {
      state.list.push(action.payload);
    },
    removeHabit: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(h => h.id !== action.payload);
    },
    filterHabits: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    }
  }
});

export const { addHabit, removeHabit, filterHabits } = habitSlice.actions;
export default habitSlice.reducer;