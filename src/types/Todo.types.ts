export type Todo = {
  id: number;
  created: string;
  isDone: boolean;
  title: string;
};

<<<<<<< HEAD
export type CreateTodo = {
  title?: string;
  isDone?: boolean;
};
=======
export type TodoRequest = Partial<Omit<Todo, "id" | "created">>;
>>>>>>> main

export type TodoInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type Meta = {
  totalAmount: number;
};

<<<<<<< HEAD
export type TodoResponse<T, N> = {
=======
export type MetaResponse<T, N> = {
>>>>>>> main
  data: T[];
  info: N;
  meta: Meta;
};

export type UpdateTodos = () => Promise<void>;
