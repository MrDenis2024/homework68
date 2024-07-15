import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiTodo, TodoMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';

export interface TodoState  {
  todos: TodoMutation[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: false,
};

export const fetchTodos = createAsyncThunk<TodoMutation[], void, {state: RootState}>('todo/fetch', async () => {
  const {data: todoResponse} = await axiosApi.get<ApiTodo | null>('/todo.json');
  if(todoResponse === null) {
    return [];
  }

  const todos: TodoMutation[] = Object.keys(todoResponse).map((id: string) => {
    return {
      ...todoResponse[id],
      id,
    };
  });
  return todos;
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.error = false;
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  }
});

export const todoReducer = todoSlice.reducer;