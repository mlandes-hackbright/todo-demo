const BASE_URL = 'http://localhost:5678'

const todoList = document.querySelector('#todo-list');
const newTaskForm = document.querySelector('#new-task-form');
const newItemTextField = document.querySelector('#new-item-text-field');
const newItemDueDateField = document.querySelector('#new-item-due-date-field');

// load those objects into the DOM
function insertTodoItemIntoList(item) {
    const li = document.createElement('li');

    if (item.completed) {
        li.innerHTML = `
        <div>
            <input id="checkbox-${item.id}" type="checkbox" checked />
            <label for="checkbox-${item.id}">
                <s>${item.task} | ${item.due}</s>
            </label>
        </div>`;
    } else {
        li.innerHTML = `
        <div>
            <input id="checkbox-${item.id}" type="checkbox" />
            <label for="checkbox-${item.id}">
                ${item.task} | ${item.due}
            </label>
        </div>`;
    }

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

newTaskForm.addEventListener('submit', evt => {
    evt.preventDefault();

    // send my post request with body 
    // { task: "value from the form" };
    const payload = {
        "task": newItemTextField.value,
        "due": newItemDueDateField.value
    };
    axios.post(`${BASE_URL}/todos`, payload)
        .then(result => {
            // reload the list of items
            newItemTextField.value = '';
            newItemDueDateField.value = '';
            loadTodoItems();
        });
});

loadTodoItems();
