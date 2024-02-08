const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const controller = require('./controller.js');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// define routes
app.get('/todos', controller.getAllTodos);
app.post('/todos', controller.addTodoItem);
app.put('/todos/:id', controller.setTodoItemState);

const { PORT } = process.env;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
