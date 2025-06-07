export async function SendUserTodos(userToDos) {
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
    return resData;
  } catch (error) {}
}

export async function fetchUserTodos() {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos");
    const resData = await response.json();
    if (!response.ok) {
      throw new Error("Error occurred");
    }
    return resData;
  } catch (error) {}
}

export async function deleteUserTodos(id) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error occurred");
    }
  } catch (error) {
    console.log("delete error:", error);
  }
}
