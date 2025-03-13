# Docker and PostgreSQL

## Running the Container
~~~
docker run --name meu-postgres -e  POSTGRES_PASSWORD=postgres -d postgres
~~~

## Executing the Terminal inside the Container
~~~
docker exec -it meu-postgres bash
~~~

## Running the `psql`
~~~
psql -U postgres
~~~

## SQL statements inside the `psql`
~~~
CREATE TABLE Person (name VARCHAR(100), age  INTEGER);

INSERT INTO Person VALUES ('Asdrubal', 32);

SELECT * FROM Person;
~~~