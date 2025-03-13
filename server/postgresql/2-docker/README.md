# Docker and PostgreSQL

## Running the Container
~~~
docker run --name my-postgres -e  POSTGRES_PASSWORD=postgres -d postgres
~~~

## Executing the Terminal inside the Container
~~~
docker exec -it my-postgres bash
~~~

## Running the `psql`
~~~
psql -U postgres
~~~

# SQL Model

Schema related to the base data model in SQL, the insertion of one tuple:

~~~
person_schema.sql
~~~
