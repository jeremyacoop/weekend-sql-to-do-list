const express = require('express');
const router = express.Router();

const pg = require('pg');
const config = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
  };

const Pool = pg.Pool;
const pool = new Pool(config);
pool.on("connect", () => {
  console.log("connected to postgres");
});
pool.on("error", (err) => {
  console.log("error connecting to postgres", err);
});

router.get('/', (req, res) => {
	console.log('in GET')
	let queryText = `SELECT * FROM "to-do";`;
	pool.query(queryText).then((result) => {
		res.send(result.rows);
	}).catch((error) => {
		console.log(`Error: Could not retrieve list`, error);
		res.sendStatus(500);
	});
});// end get

router.post('/', (req, res) => {
    console.log('in POST');
	let newTD = req.body;
	console.log('Adding new item:', newTD);

	let queryText = `INSERT INTO "to-do" ("name", "section", "notes")
					VALUES ($1, $2, $3, $4)`;
	pool.query(queryText, [newTD.name, newTD.section, newTD.notes])
        .then((result) => {
            console.log('Added item', result);
            res.sendStatus(201);
        }).catch((error) => {
            console.log(`Error adding new item`, error);
            res.sendStatus(500);
        });
});// end post

router.delete('/:id', (req, res) => {
    console.log('in DELETE');
    let todoId = req.params.id;
    console.log(`ID of ${todoId} will be removed from the database`);
    let queryText = `
        DELETE FROM "to-do"
        WHERE "id" = $1
        `;
    pool.query(queryText, [todoId]).then((response) =>{
        console.log(response);
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE`, error);
        res.sendStatus(500);
    });
});// end delete

router.put('/:id', (req, res) => {
    console.log('in PUT');
    let todoId = req.params.id;
    console.log(`Mark to-do item complete?`, req.body.complete);
    let queryText = `
    UPDATE "to-do"
    SET "complete" = $5
    WHERE "id" = $1;
    `;
    pool.query(queryText, [todoId, req.body.complete]).then((response) => {
        console.log(response);
        res.sendStatus(200);
    }).catch(( error ) => {
        console.log('Error:', error);
        res.sendStatus(500);
    });
});// end put
module.exports = router;