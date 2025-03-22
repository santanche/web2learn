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

## Access

* api access: http://127.0.0.1:8000/
* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/about/my_app/