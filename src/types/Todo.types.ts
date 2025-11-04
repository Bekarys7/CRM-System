export type Todo = {
  id: number;
  created: string;
  isDone: boolean;
  title: string;
};

export type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

export type TodoInfo = {
  all: number;
  completed: number;
  inWork: number;
};

export type Meta = {
  totalAmount: number;
};

export type MetaResponse<T, N> = {
  data: T[];
  info: N;
  meta: Meta;
};

export type UpdateTodos = () => Promise<void>;
