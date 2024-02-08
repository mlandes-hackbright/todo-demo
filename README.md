# Running the code

1. create a database (postgres is used in this demo)
1. `npm install`
1. `touch .env` to create the environment file, in this file you will need
    - `PORT=5678` - this value is hard-coded as the port the front-end uses
    - `CONNECTION_STRING=...` - the connection string for your database
1. `node util/seed.js` to seed the database
1. `node server/main.js` to run the server
1. open up the `index.html` page in the browser

Now you can keep track of your todo items &#x263A;
