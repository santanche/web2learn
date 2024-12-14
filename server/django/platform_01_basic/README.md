# Django

## Creating a Django Project

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial01/

~~~
django-admin startproject platform_01_basic

cd platform_01_basic
~~~

## Creating an App inside a Project

~~~
python3 manage.py startapp basic
~~~

Changing the `basic/views.py`:

~~~python
from django.http import HttpResponse

def index(request):
    return HttpResponse("The dinosaur jumped into the mud.")
~~~

Adding a local route (`basic/urls.py`):

~~~python
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
]
~~~

Connecting to the main route (`platform_01_basic/urls.py`):

~~~python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("start/", include("basic.urls")),
    path('admin/', admin.site.urls),
]
~~~

## Running the Server

~~~
cd platform_01_basic

python3 manage.py runserver
~~~

* page address: http://127.0.0.1:8000/start/