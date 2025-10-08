export type Todo = {
  id: number;
  created: string;
  isDone: boolean;
  title: string;
};

export type CreateTodo = {
  title: string;
  isDone: boolean;
};

export type Info = {
  all: number;
  completed: number;
  inWork: number;
};

export type Meta = {
  totalAmount: number;
};

export type TodoResponse<T, N> = {
  data: T[]; 
  info: N;
  meta: Meta;
};

export type UpdateTodos = () => Promise<void>;
