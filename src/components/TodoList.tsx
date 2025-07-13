import TodoItem from "./TodoItem";
import type { Todo, UpdateTodos } from "../types/Todo";
type TodoList = { toDoArray: Todo[]; updateTodos: UpdateTodos };

const TodoList: React.FC<TodoList> = ({ toDoArray, updateTodos }) => {
  return toDoArray.map((todo) => {
    return (
      <div key={todo.id}>
        <TodoItem todo={todo} updateTodos={updateTodos} />
      </div>
    );
  });
};
export default TodoList;
