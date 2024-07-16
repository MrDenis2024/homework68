export interface Todo {
  title: string;
  status: boolean;
}

export interface TodoMutation extends Todo {
  id: string;
}

export interface ApiTodo {
  [id: string]: Todo;
}