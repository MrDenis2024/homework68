import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiTodo, TodoMutation} from '../../types';
import axiosApi from '../../axiosApi';
import {RootState} from '../../app/store';
import {toast} from 'react-toastify';

export interface TodoState  {
  todos: TodoMutation[];
  isLoading: boolean;
  btnLoading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  btnLoading: false,
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

export const changeTodo = createAsyncThunk<void, TodoMutation, {state: RootState}> ('todo/change', async (todo) => {
  await axiosApi.put(`/todo/${todo.id}.json`, { title: todo.title, status: !todo.status });
});

export const deleteTodo = createAsyncThunk<void, TodoMutation, {state: RootState}> ('todo/delete', async (todo) => {
  await axiosApi.delete(`/todo/${todo.id}.json`);
});

export const addTodo = createAsyncThunk<void, string, {state: RootState}> ('todo/add', async (title) => {
  await axiosApi.post('/todo.json', {title, status: false});
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
      toast.error('Ошибка получения данных с сервера');
    });
    builder.addCase(changeTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(changeTodo.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Задача успешно изминила свой статус');
    });
    builder.addCase(changeTodo.rejected, (state) => {
      state.isLoading = false;
      toast.error('Ошибка изменения данных');
    });
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteTodo.fulfilled, (state) => {
      state.isLoading = false;
      toast.success('Задача успешно удалена');
    });
    builder.addCase(deleteTodo.rejected, (state) => {
      state.isLoading = false;
      toast.error('Ошибка удаления данных');
    });
    builder.addCase(addTodo.pending, (state) => {
      state.btnLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state) => {
      state.btnLoading = false;
      toast.success('Задача успешно добалвена');
    });
    builder.addCase(addTodo.rejected, (state) => {
      state.btnLoading = false;
      toast.error('Ошибка отправки данных');
    });
  }
});

export const todoReducer = todoSlice.reducer;