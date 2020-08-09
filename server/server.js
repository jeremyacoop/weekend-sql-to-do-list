const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');

const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', // name of our database
    host: 'localhost', // where is your database?
    port: 5432, // this is the default port
    max: 10, // number of connections
    idleTimeoutMillis: 10000 // 10 seconds
})

const PORT = 5000;
app.listen(PORT, () => {
	console.log('server up on port', PORT);
	});

app.get('/', (req, res) => {
	console.log('in ')
	let queryText = `SELECT * FROM "To-do";`;
	pool.query(queryText).then((result) => {
		res.send(result.rows);
	}).catch((error) => {
		console.log(`Error: Could not retrieve list`, error);
		res.sendStatus(500);
	});
});// end get

app.post('/', (req, res) => {
	let newTD = req.body;
	console.log('Adding new item:', newTD);

	let queryText = `INSERT INTO "To-do" ("name", "subject", "priority", "status")
					VALUES ($1, $2, $3, $4)`;
	pool.query(queryText, [newTD.name, newTD.subject, newTD.priority, newTD.status])
	.then((result) => {
		console.log('Added item', result);
		res.sendStatus(201);
	}).catch((error) => {
		console.log(`Error adding new item`, error);
		res.sendStatus(500);
	});
});// end post