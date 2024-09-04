# SQLModel
https://sqlmodel.tiangolo.com/

# Installing

~~~
pip install sqlmodel
~~~

## PostgreSQL adapter

Installing dependencies:
~~~
sudo apt-get install libpq-dev python3-dev
~~~

### psycopg2
https://pypi.org/project/psycopg2/

~~~
pip install psycopg2
~~~

# Simple Example

A simple and complete example of defining a model, creating a table, and inserting three records. There are two versions:

* Version for Python 3.7+ using `Optional[ ]` for optional fields:
~~~
users_example_3_07.py
~~~

* Version for Python 3.10+ using `type | None` for optional fields:
~~~
users_example_3_10.py
~~~

Examples derived from the tutorials:
* https://sqlmodel.tiangolo.com/
* https://sqlmodel.tiangolo.com/tutorial/create-db-and-table/
* https://sqlmodel.tiangolo.com/tutorial/insert/

See details of Union Type at: https://docs.python.org/3/library/stdtypes.html#types-union

See Database Engine Configuration for PostgreSQL at: https://docs.sqlalchemy.org/en/14/core/engines.html