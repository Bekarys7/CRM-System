export async function addTodo(userToDos) {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(userToDos),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error occurred");
    }

    const resData = await response.json();
    console.log(resData);
    return resData;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchTodos(tab) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${tab}`
    );
    if (!response.ok) {
      throw new Error("Error fetch");
    }
    const resData = await response.json();
    return resData;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodos(id) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error delete");
    }
  } catch (error) {
    alert(error);
  }
}

export async function editTodos(id, task) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error("Error occurred");
    }
  } catch (error) {
    console.log("delete error:", error);
  }
}
