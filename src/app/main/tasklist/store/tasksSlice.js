import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import ApiService from 'app/services/api';

export const getAll = createAsyncThunk('tasks/getTasks', async (_, { dispatch }) => {
  const response = await ApiService.doGet(
    `/task/readTasksByUserId?token=${localStorage.getItem('token')}`
  );
  if (!response.ok) throw Error('token inválido');

  return response.data;
});

const adapter = createEntityAdapter({
  selectId: (task) => task.id,
});

export const { selectAll, selectById } = adapter.getSelectors((state) => state.tasks);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getAll.fulfilled]: adapter.setAll,
    [getAll.rejected]: (state, action) => {
      alert('token inválido, faça o login novamente');
    },
  },
});

export default tasksSlice.reducer;
