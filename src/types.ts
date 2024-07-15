export interface Todo {
  title: string;
  status: boolean;
}

export interface TodoMutation {
  id: string;
  title: string;
  status: boolean;
}

export interface ApiTodo {
  [id: string]: Todo;
}