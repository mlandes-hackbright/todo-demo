const dotenv = require('dotenv');
const sequelize = require('sequelize');

dotenv.config();

const { CONNECTION_STRING } = process.env;
const sql = new sequelize.Sequelize(CONNECTION_STRING);

module.exports = {
    getAllTodos: (req, res) => {
        sql.query('SELECT * FROM todos;').then(sqlResult => {
            const data = sqlResult[0];
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    },

    addTodoItem: (req, res) => {
        // extract the actual task from the request itself
        // const task = "practice piano";

        // req.body = {
        //     "task": "practice piano"
        // }

        const task = req.body.task;
        
        const SQL_CODE = `INSERT INTO todos (task)
        VALUES ('${task}');`;

        sql.query(SQL_CODE).then(sqlResult => {
            res.status(200).end();
        }).catch(err => {
            res.status(500).send(err);
        });
    }
};