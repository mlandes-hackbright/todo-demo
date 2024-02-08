const dotenv = require('dotenv');
const sequelize = require('sequelize');

dotenv.config();

const { CONNECTION_STRING } = process.env;
const sql = new sequelize.Sequelize(CONNECTION_STRING);

module.exports = {
    getAllTodos: (req, res) => {
        sql.query('SELECT * FROM todos ORDER BY due;').then(sqlResult => {
            const data = sqlResult[0];
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send(err);
        });
    },

    addTodoItem: (req, res) => { // NOTE: need to update to account for 'completed' and 'due'
        // const task = req.body.task;
        // const due = req.body.due;
        const { task, due } = req.body;
        
        const SQL_CODE = `INSERT INTO todos (task, completed, due)
        VALUES ('${task}', false, '${due}');`;

        sql.query(SQL_CODE).then(sqlResult => {
            res.status(200).end();
        }).catch(err => {
            res.status(500).send(err);
        });
    }
};