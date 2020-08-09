CREATE TABLE "To-do" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100) NOT NULL,
	"section" VARCHAR(60),
	"priority" CHAR(1),
	"status" BOOLEAN,
	"time_started" TIMESTAMP,
	"time_completed" TIMESTAMP,
	"notes" VARCHAR(100)
);
