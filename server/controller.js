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

    addTodoItem: (req, res) => {
        const { task, due } = req.body;
        
        const SQL_CODE = `INSERT INTO todos (task, completed, due)
        VALUES ('${task}', false, '${due}');`;

        sql.query(SQL_CODE).then(sqlResult => {
            res.status(200).end();
        }).catch(err => {
            res.status(500).send(err);
        });
    },

    setTodoItemState: (req, res) => {
        // the id (which item are we updating) is part of the path
        // the completed state comes from the request body
        const { id: idParam } = req.params;
        const id = new Number(idParam);

        const { completed } = req.body;

        // update the database AND also return the updated item from the database
        const SQL = `UPDATE todos
            SET completed = ${ completed ? 'true' : 'false' }
            WHERE id = ${ id };
            
            SELECT * FROM todos WHERE id = ${ id };`;
        
        sql.query(SQL).then(sqlResult => {
            // get the updated item value from the database
            const [data, ] = sqlResult;
            const updatedItem = data[0];
            res.status(200).send(updatedItem);
        });
    }
};