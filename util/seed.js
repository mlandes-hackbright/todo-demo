const dotenv = require('dotenv');
const sequelize = require('sequelize');

dotenv.config();

const { CONNECTION_STRING } = process.env;
const sql = new sequelize.Sequelize(CONNECTION_STRING);

const SQL_CODE = `DROP TABLE IF EXISTS todos;

CREATE TABLE todos (
	id SERIAL PRIMARY KEY,
	task TEXT NOT NULL,
	completed BOOLEAN NOT NULL,
	due DATE NOT NULL
);

INSERT INTO todos (task, completed, due)
VALUES ('clean room', true, '2024-02-06'),
	('cook dinner', false, '2024-02-07'),
	('take friend to movie', false, '2024-02-08');`;

sql.query(SQL_CODE).then(sqlResult => {
    console.log('successfully seeded the database');
}).catch(err => {
    console.log('failed to seed database', err);
});
