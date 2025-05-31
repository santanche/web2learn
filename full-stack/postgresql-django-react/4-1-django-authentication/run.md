# Django Server - Full Stack Environment
## Running the Server

If it is your first time, we suggest you read [setup.md](setup.md) to set the environment before running.

## Running the PostgreSQL DBMS

Before running the Django server, you must [run the PostgreSQL DBMS](../1-postgresql/run.md).

## Running a Virtual Environment for Django

~~~
source .venv/bin/activate
~~~

## Running the Server

Running the server. Inside the root `my_project`:

~~~
python3 manage.py runserver
~~~

## API Access

* api access: http://127.0.0.1:8000/
* admin address: http://127.0.0.1:8000/admin/