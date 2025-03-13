# PostgreSQL
https://www.postgresql.org

## Install Ubuntu

Installation instructions:
https://www.postgresql.org/download/linux/ubuntu/

The simplest approach probably will not install the latest version:
~~~
apt install postgresql
~~~

To install the latest one, follow the instructions of "manually configure the Apt repository".

## pgAdmin
https://www.pgadmin.org/

Detailed instructions to install pgAdmin via apt:
https://www.pgadmin.org/download/pgadmin-4-apt/

## Changing the Password

~~~
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
~~~

## Server Management

The three following commands start, stop, and show the status of the server at Ubuntu, respectively:

~~~
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl status postgresql
~~~

Reference: https://tableplus.com/blog/2018/10/how-to-start-stop-restart-postgresql-server.html

## Repository Location

To change the database location at Ubuntu:
https://www.digitalocean.com/community/tutorials/how-to-move-a-postgresql-data-directory-to-a-new-location-on-ubuntu-20-04

# SQL Model

Schema related to the base data model in SQL, the insertion of three tuples:

~~~
users_schema.sql
~~~