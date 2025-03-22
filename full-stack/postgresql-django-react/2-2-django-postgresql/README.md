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
pip install djangorestframework
pip install markdown
pip install django-filter
~~~

### Django Setup - Requirements Approach

~~~
pip install -r requirements.txt
~~~

### Updating `requirements.txt`

~~~
pip freeze -l > requirements.txt
~~~

## Leaving the Virtual Environment

~~~
deactivate
~~~

## Creating a Django Project

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial01/

~~~
django-admin startproject app_server

cd app_server
~~~

## Creating an App inside a Project

~~~
python3 manage.py startapp person
~~~

Changing the `person/views.py`:

~~~python
from django.http import HttpResponse

def index(request):
    return HttpResponse("This is a person manager.")
~~~

Adding a local route (`person/urls.py`):

~~~python
from django.urls import include, path

from . import views

urlpatterns = [
    path('about/person/', views.index, name="index"),
]
~~~

Connecting to the main route (`app_server/urls.py`):

~~~python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('person.urls')),
    path('admin/', admin.site.urls),
]
~~~

## Creating a Database

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial02/

~~~
python3 manage.py migrate
~~~

Changing `person/models.py`

~~~python
class Person(models.Model):
    email_id = models.CharField(max_length=320)
    name = models.CharField(max_length=100)
    birthday = models.DateTimeField()

    def __str__(self):
        return self.email_id
~~~

Adding in `app_server/settings.py`:

~~~python
INSTALLED_APPS = [
    'person.apps.PersonConfig',
    ...
]
~~~

Replace the DATABASES directive in `app_server/settings.py`:

~~~python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'localhost',  # Set to your database host
        'PORT': '5432',  # Default port for PostgreSQL
    }
}
~~~

## Building a Migration Code

~~~
python3 manage.py makemigrations person
~~~

## Shows the SQL that creates the tables

~~~
python3 manage.py sqlmigrate person 0001
~~~

## Applying Migration

~~~
python3 manage.py migrate
~~~

## Adding in the admin panel

File `person/admin.py`:

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

Adding in `app_server/settings.py`:

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

Create an API specification for person (`person/api.py`). Details of ViewSet customization applied to CommentViewSet can be found at: https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset.

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
router.register(r'person', PersonViewSet, basename='person')
~~~

Create the complete API specification file (`app_server/api.py`), importing the person API and adding routes to access administrative data - users:

~~~python
from rest_framework import routers, serializers, viewsets

from django.contrib.auth.models import User
from person.apis import router as person_router

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
router.registry.extend(person_router.registry)
~~~

Expand the `app_server/urls.py`:

~~~python
from django.contrib import admin
from django.urls import include, path
from . import api

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(api.router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('person.urls')),
    path('admin/', admin.site.urls),
]
~~~

## Running the Server

Running the server

~~~
cd app_server

python3 manage.py runserver
~~~

## Postman API Access

Import specification: Plots.postman_collection.json

* api access: http://127.0.0.1:8000/
* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/about/person/