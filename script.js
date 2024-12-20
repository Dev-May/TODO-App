const apiKey = "67649b2b60a208ee1fde7394";
const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", addTodo);

async function addTodo() {
  const title = document.querySelector("#title");
  let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      apiKey,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  if (data.message === "success") {
    alert("success");
    title.value = "";
    getAllTodo();
  }
  // if (response.status == 201) {
  //   // display toast msg
  //   console.log(response);
  // }
}

async function getAllTodo() {
  let response = await fetch(
    `https://todos.routemisr.com/api/v1/todos/${apiKey}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  let data = await response.json();
  let allTodos = data.todos;
  console.log(allTodos);
  displayData(allTodos);
}
getAllTodo();

function displayData(data) {
  let cartona = ``;
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].completed);

    cartona += `<div class="alert alert-secondary d-flex justify-content-between">
          <p class="mb-0 ${
            data[i].completed ? "text-decoration-line-through" : ""
          }">${data[i].title}</p>
          <div class="actions">
            <i class="fa-solid fa-trash-can text-danger fs-5 mx-2" onclick="deleteTodo('${
              data[i]._id
            }')"></i>
            ${
              data[i].completed
                ? ""
                : `<i class="fa-solid fa-clipboard-check fs-5" onclick="markAsCompleted('${data[i]._id}')"></i>`
            }
          </div>
        </div>`;
  }

  document.querySelector(".todoContainer").innerHTML = cartona;
}

async function deleteTodo(todoId) {
  console.log(todoId);
  let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "DELETE",
    body: JSON.stringify({
      todoId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  data.message == "success" && getAllTodo();
}

async function markAsCompleted(todoId) {
  let response = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "PUT",
    body: JSON.stringify({
      todoId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await response.json();
  data.message == "success" && getAllTodo();
}
