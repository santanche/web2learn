# Django

# Virtual Environment

## Creating a Virtual Environment for Django

~~~
python3 -m venv .venv
~~~

## Running a Virtual Environment for Django

~~~
source .venv/bin/activate
~~~

### Django Setup - Manual Approach

~~~
python3 -m pip install Django
~~~

### Django Setup - Requirements Approach

~~~
pip install -r requirements.txt
~~~

## Creating a Django Project

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial01/

~~~
django-admin startproject my_project

cd my_project
~~~

## Creating an App inside a Project

~~~
python3 manage.py startapp my_app
~~~

Changing the `my_app/views.py`:

~~~python
from django.http import HttpResponse

def index(request):
    return HttpResponse("This is a My App manager.")
~~~

Adding a local route (`my_app/urls.py`):

~~~python
from django.urls import include, path

from . import views

urlpatterns = [
    path('about/my_app/', views.index, name="index"),
]
~~~

Connecting to the main route (`my_project/urls.py`):

~~~python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('my_app.urls')),
    path('admin/', admin.site.urls),
]
~~~

## Connecting to a Database

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial02/

### Django Setup - Manual Approach

~~~
pip install markdown
pip install django-filter
pip install psycopg2
~~~

### Django Setup - Requirements Approach

~~~
pip install -r requirements.txt
~~~

Changing `my_app/models.py`

~~~python
from django.db import models

class Person(models.Model):
    email_id = models.CharField(max_length=320)
    name = models.CharField(max_length=100)
    birthday = models.DateTimeField()

    def __str__(self):
        return self.email_id
~~~

Adding in `my_project/settings.py`:

~~~python
INSTALLED_APPS = [
    'my_app.apps.MyAppConfig',
    ...
]
~~~

Replace the DATABASES directive in `my_project/settings.py`:

~~~python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost', 
        'PORT': '5432'
    }
}
~~~

## Building a Migration Code

~~~
python3 manage.py makemigrations my_app
~~~

## Shows the SQL that creates the tables

~~~
python3 manage.py sqlmigrate my_app 0001
~~~

## Applying Migration

~~~
python3 manage.py migrate
~~~

## Adding in the admin panel

File `my_app/admin.py`:

~~~python
from django.contrib import admin

from .models import Person

admin.site.register(Person)
~~~

## Adding an admin user

~~~
python3 manage.py createsuperuser
~~~

## Running the Server

Running the server

~~~
cd my_project

python3 manage.py runserver
~~~

### Updating `requirements.txt`

~~~
pip freeze -l > requirements.txt
~~~

## Leaving the Virtual Environment

~~~
deactivate
~~~

## Postman API Access

Import specification: Plots.postman_collection.json

* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/about/my_app/