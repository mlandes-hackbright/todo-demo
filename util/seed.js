const dotenv = require('dotenv');
const sequelize = require('sequelize');

dotenv.config();

const { CONNECTION_STRING } = process.env;
const sql = new sequelize.Sequelize(CONNECTION_STRING);

const SQL_CODE = `DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	task TEXT
);

INSERT INTO todos (task)
VALUES ('clean room'),
	('cook dinner'),
	('take friend to movie');`;

sql.query(SQL_CODE).then(sqlResult => {
    console.log('successfully seeded the database');
}).catch(err => {
    console.log('failed to seed database', err);
});
