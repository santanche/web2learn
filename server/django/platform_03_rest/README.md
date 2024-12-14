# Django

## Creating a Django Project

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial01/

~~~
django-admin startproject platform_03_rest

cd platform_03_rest
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

Connecting to the main route (`platform_03_rest/urls.py`):

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

Adding in `platform_03_rest/settings.py`:

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
python manage.py sqlmigrate plot 0001
~~~

## Applying Migration

~~~
python manage.py migrate
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

## Expanding the venv

Inside the venv:

~~~
pip install djangorestframework
pip install markdown
pip install django-filter
~~~

## Expanding to REST

Adding in `platform_03_rest/settings.py`:

~~~python
INSTALLED_APPS = [
    ...
    'rest_framework',
]

...

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
~~~

Adding in `platform_03_rest/urls.py`:

~~~python
from django.contrib import admin
from django.urls import include, path
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("plot/", include("plot.urls")),
    path('admin/', admin.site.urls),
]
~~~

## Running the Server

~~~
cd platform_03_rest

python3 manage.py runserver
~~~

* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/plot/