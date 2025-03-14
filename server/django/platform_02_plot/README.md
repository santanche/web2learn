# Django

## Creating a Django Project

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial01/

~~~
django-admin startproject platform_02_plot

cd platform_02_plot
~~~

## Creating an App inside a Project

~~~
python3 manage.py startapp plot
~~~

Changing the `plot/views.py`:

~~~python
from django.http import HttpResponse

def index(request):
    return HttpResponse("This is a plot editor.")
~~~

Adding a local route (`plot/urls.py`):

~~~python
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
]
~~~

Connecting to the main route (`platform_02_plot/urls.py`):

~~~python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("plot/", include("plot.urls")),
    path('admin/', admin.site.urls),
]
~~~

## Creating a Database

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial02/

~~~
python3 manage.py migrate
~~~

Changing `plot/models.py`

~~~python
class Plot(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField("date created")

    def __str__(self):
        return self.title

class Comment(models.Model):
    plot = models.ForeignKey(Plot, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    grade = models.IntegerField(default=0)

    def __str__(self):
        return self.plot.title + " / " + self.text
~~~

Adding in `platform_02_plot/settings.py`:

~~~python
INSTALLED_APPS = [
    'plot.apps.PlotConfig',
    ...
]
~~~

## Building a Migration Code

~~~
python3 manage.py makemigrations plot
~~~

## Shows the SQL that creates the tables

~~~
python3 manage.py sqlmigrate plot 0001
~~~

## Applying Migration

~~~
python3 manage.py migrate
~~~

## Adding in the admin panel

File `plot/admin.py`:

~~~python
from django.contrib import admin

from .models import Plot, Comment

admin.site.register(Plot)
admin.site.register(Comment)
~~~

## Adding an admin user

~~~
python3 manage.py createsuperuser
~~~

## Running the Server

~~~
cd platform_02_plot

python3 manage.py runserver
~~~

* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/plot/