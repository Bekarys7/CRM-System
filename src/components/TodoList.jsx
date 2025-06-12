import TodoItem from "./TodoItem";

export default function TodoList({
  userToDos,
  //   setUserToDos,
  handlefetchUserTodos,
}) {
  return userToDos.map((item) => {
    return (
      <div key={item.id}>
        <TodoItem
          item={item}
          //   setUserToDos={setUserToDos}
          handlefetchUserTodos={handlefetchUserTodos}
          userToDos={userToDos}
        />
      </div>
    );
  });
}
