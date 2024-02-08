const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('sequelize');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const { CONNECTION_STRING } = process.env;
const sql = new sequelize.Sequelize(CONNECTION_STRING);

// define routes
app.get('/todos', (req, res) => {
    sql.query('SELECT * FROM todos;').then(sqlResult => {
        const data = sqlResult[0];
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send(err);
    });
});

const { PORT } = process.env;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
