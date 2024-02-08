const BASE_URL = 'http://localhost:5678'

const todoList = document.querySelector('#todo-list');
const newTaskForm = document.querySelector('#new-task-form');
const newItemTextField = document.querySelector('#new-item-text-field');
const newItemDueDateField = document.querySelector('#new-item-due-date-field');

function handleCheckToggle(item, li) {
    // send request to update the data
    const payload = {
        "completed": !item.completed
    };
    axios.put(`${BASE_URL}/todos/${item.id}`, payload)
        .then(result => {
            // on success, make sure the front-end is in sync
            item.completed = result.data.completed;
            if (item.completed) {
                li.querySelector('label').innerHTML = `<s>${item.task} | ${item.due} </s>`;
            } else {
                li.querySelector('label').innerHTML = `${item.task} | ${item.due}`;
            }
        }).catch(err => {
            // on error, should also revert change on front-end (undo checkbox checked)
        });
}

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

    // add this so that when we click on a checkbox, we update the item
    // not only here, but also on the server / db
    li.querySelector('input').addEventListener('click', () => {
        handleCheckToggle(item, li);
    });

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
