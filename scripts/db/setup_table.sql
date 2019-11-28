CREATE TABLE IF NOT EXISTS team (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),	
	division VARCHAR(255),
	conference VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS score (
	id SERIAL PRIMARY KEY,
	team_id INT REFERENCES team (id),
	year VARCHAR(255),
	conference VARCHAR(255),
	division VARCHAR(255)
);
