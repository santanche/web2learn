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

## Expanding to REST

* souce: https://www.django-rest-framework.org/#installation

### Django Setup - Manual Approach

~~~
pip install djangorestframework
~~~

### Django Setup - Requirements Approach

~~~
pip install -r requirements.txt
~~~

Adding in `my_project/settings.py`:

~~~python
INSTALLED_APPS = [
    ...
    'rest_framework'
]

...

REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}
~~~

Create an API specification for my app (`my_app/api.py`). Details of ViewSet customization applied to CommentViewSet can be found at: https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset.

~~~python
from rest_framework import routers, serializers, viewsets

from .models import Person

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Person
        fields = ['email_id', 'name', 'birthday']

class PersonViewSet(viewsets.ModelViewSet):
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

router = routers.DefaultRouter()
router.register(r'person', PersonViewSet, basename='my_app')
~~~

Create the complete API specification file (`my_project/api.py`), importing the my_app API and adding routes to access administrative data - users:

~~~python
from rest_framework import routers, serializers, viewsets

from django.contrib.auth.models import User
from my_app.api import router as my_app_router

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
router.registry.extend(my_app_router.registry)
~~~

Expand the `my_project/urls.py`:

~~~python
from django.contrib import admin
from django.urls import include, path
from . import api

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(api.router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('my_app.urls')),
    path('admin/', admin.site.urls),
]
~~~

## CORS for the Local Server

### Django Setup - Manual Approach

~~~
pip install django-cors-headers
~~~

### Django Setup - Requirements Approach

~~~
pip install -r requirements.txt
~~~

Adding in `my_project/settings.py`:

~~~python
INSTALLED_APPS = [
    ...
    'corsheaders'
]

MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware'
]

...

# Allow requests from your React app
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173"
]

# If you want to allow credentials (cookies, etc.)
CORS_ALLOW_CREDENTIALS = True
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

* api access: http://127.0.0.1:8000/
* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/about/my_app/