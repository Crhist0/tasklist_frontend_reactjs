/* eslint-disable camelcase */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiService from 'app/services/api/';
import { getAll } from './tasksSlice';

export const saveOne = createAsyncThunk('task/saveOne', async (data, { dispatch }) => {
  // data = {description, detail, token}
  const response = await ApiService.doPost('/task/', data);

  return response;
});

export const updateOne = createAsyncThunk(
  'task/updateOne',
  async (data, { dispatch, getState }) => {
    // data = {id, description, detail, token}
    const response = await ApiService.doPut(`/task/`, data);

    return response;
  }
);

export const deleteOne = createAsyncThunk('task/deleteOne', async (id, { dispatch, getState }) => {
  // id = {id, token}{ id: value.id, token:  }
  const response = await ApiService.doDelete(
    `/task/?id=${id}&token=${localStorage.getItem('token')}`
  );
  dispatch(getAll());

  return response;
});

const initialState = {
  id: '',
  description: '',
  detail: '',
  created_at: '',
  updated_at: '',
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    clearState: (state, action) => initialState,
    updateState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [saveOne.fulfilled]: (state, action) => action.payload,
    [updateOne.fulfilled]: (state, action) => action.payload,
  },
});

export const { updateState, clearState } = taskSlice.actions;

export default taskSlice.reducer;
