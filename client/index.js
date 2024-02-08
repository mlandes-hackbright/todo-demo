const BASE_URL = 'http://localhost:5678'

const todoList = document.querySelector('#todo-list');

// load those objects into the DOM
function insertTodoItemIntoList(item) {
    const li = document.createElement('li');

    li.innerHTML = `${item.task}`;

    todoList.appendChild(li);
}

// write function that calls /todos route to get list of objects
function loadTodoItems() {
    todoList.replaceChildren();

    axios.get(`${BASE_URL}/todos`)
        .then(result => {
            for (const item of result.data) {
                insertTodoItemIntoList(item);
            }
        });
}

loadTodoItems();
