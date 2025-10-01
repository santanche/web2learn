# Django Server - Full Stack Environment
## Step-by-Step Construction

## Virtual Environment

This is a step-by-step presentation to understand how this server setup was produced.

### Creating a Virtual Environment for Django

~~~
python3 -m venv .venv
~~~

### Running a Virtual Environment for Django

~~~
source .venv/bin/activate
~~~

## Django Setup - Manual Approach

~~~
python3 -m pip install Django
~~~

## Django Setup - Requirements Approach

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

## Authentication

### Django Setup - Manual Approach

~~~
pip install google-auth
pip install requests
pip install dotenv
~~~

### Django Setup - Requirements Approach

~~~
pip install -r requirements.txt
~~~

## Update Settings

Adding in `my_project/settings.py`:

~~~python
# ...

INSTALLED_APPS = [
    # ...
    'rest_framework.authtoken'
]
~~~

Load environment variables and set constants. The field `SECRET_KEY` produced by Django is transferred to the .env file (`DJANGO_SECRET_KEY` field) and its value is replaced by `os.getenv('DJANGO_SECRET_KEY')`:

~~~python
import os
from dotenv import load_dotenv

# ...

# Load environment variables from .env file
load_dotenv()

# The key produced by Django here was transferred to the .env file.
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')

# Google OAuth settings
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')

CLIENT_URL = os.getenv('CLIENT_URL')
SERVER_URL = os.getenv('SERVER_URL')
~~~

Update the database directives to use environment variables:

~~~python
DATABASES = {
    'default': {
        'ENGINE': os.getenv('DB_ENGINE'),
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': os.getenv('DB_HOST'),
        'PORT': os.getenv('DB_PORT')
    }
}
~~~

Replace inline definitions by values from environment variables:

~~~python
# Allow requests from your React app
CORS_ALLOWED_ORIGINS = [
    CLIENT_URL
]
~~~

Update the permissions in the REST_FRAMEWORK, replacing the default permission DEFAULT_PERMISSION_CLASSES. Add an authentication class. The result is the following: 

~~~python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ]
}
~~~

## Updating the model to complement Django's user model

Changing `my_app/models.py`

~~~python
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Person(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='person',
        primary_key=True)
    google_id = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.URLField(max_length=255, blank=True, null=True)
    birth = models.DateField(blank=True, null=True)

    def __str__(self):
        return self.user.username

# Automatically create or update Person when User is created/updated
@receiver(post_save, sender=User)
def create_or_update_person(sender, instance, created, **kwargs):
    if created:
        Person.objects.create(user=instance)
    else:
        instance.person.save()
~~~

## Updating the Person serializer

Update the person serializer to reflect the new model and the authentication approach TokenAuthentication/IsAuthenticated (`my_app/api.py`):

~~~python
from rest_framework import routers, serializers, viewsets
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Person

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

class PersonSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Person
        fields = ['user_id', 'username', 'first_name', 'last_name', 'email', 'birth', 'google_id', 'profile_picture']

class PersonViewSet(viewsets.ModelViewSet):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Person.objects.all()
    serializer_class = PersonSerializer

router = routers.DefaultRouter()
router.register(r'person', PersonViewSet, basename='my_app')
~~~

## Replacing the View

Changing the `my_app/views.py` to handle authentication:

~~~python
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import Person

class GoogleAuthView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        google_token = request.data.get('token')

        if not google_token:
            return Response({'error': 'Token is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                google_token, 
                requests.Request(), 
                settings.GOOGLE_CLIENT_ID
            )

            # Get user information from the token
            google_id = idinfo['sub']
            email = idinfo['email']
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')
            profile_picture = idinfo.get('picture', '')

            # Check if user exists, create if not
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                # Create a new user
                username = email.split('@')[0]
                # Make sure username is unique
                if User.objects.filter(username=username).exists():
                    username = f"{username}_{google_id[:8]}"

                user = User.objects.create_user(
                    username=username,
                    email=email,
                    first_name=first_name,
                    last_name=last_name
                )

            # Update or create person
            person, created = Person.objects.get_or_create(user=user)
            person.google_id = google_id
            person.profile_picture = profile_picture
            person.save()

            # Create or get authentication token
            token, created = Token.objects.get_or_create(user=user)

            # Return user data and token
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip(),
                    'picture': person.profile_picture
                }
            })

        except ValueError:
            # Invalid token
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Person.objects.all()

    def get(self, request):
        user = request.user

        if not user.is_authenticated:
            return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({
            'id': user.id,
            'email': user.email,
            'name': f"{user.first_name} {user.last_name}".strip(),
            'picture': user.person.profile_picture if hasattr(user, 'person') else None
        })
~~~

## Update Endpoints

Modify the local route (`my_app/urls.py`) to include authentication:

~~~python
from django.urls import path
from .views import GoogleAuthView, UserView

urlpatterns = [
    path('auth/google/', GoogleAuthView.as_view(), name='google-auth'),
    path('user/', UserView.as_view(), name='user'),
]
~~~

Update the main route (`my_project/urls.py`) to include authentication routes:

~~~python
# ...

urlpatterns = [
    # ...
    path('', include('my_app.urls')),
    # ...
]
~~~

## Cleaning up the Database

Since we refactored the Person table, we have two options:
1. migrate the table - this will be the best solution if we are in a production environment, and we want to keep the existing data in the table;
2. clean up the database and restart again - this is the solution we will adopt in this tutorial because it is simpler.

Migration is not that complex when we add non-mandatory fields or remove fields that are not part of the primary key. In this case, we are altering the primary key, and the migration will not be trivial.

Steps to rebuild the database from scratch. This is only advised in a training database because you will lose all data:

1) delete the first migration file "00001_initial" inside "my_project/my_app/migrations";
2) stop the Postgres DBMS;
3) remove the database folder that you declared in the Docker compose, for example: "/home/user/data/pgsql/docker";
4) create this folder again;
5) start the DBMS again.

Inside the root `my_project`:

## Building a Migration Code

~~~
python3 manage.py makemigrations my_app
~~~

## Showing the SQL that creates the tables

~~~
python3 manage.py sqlmigrate my_app 0001
~~~

Expected output:

~~~sql
BEGIN;
--
-- Create model Person
--
CREATE TABLE "my_app_person" ("user_id" integer NOT NULL PRIMARY KEY, "google_id" varchar(100) NULL, "profile_picture" varchar(255) NULL, "birth" date NULL);
ALTER TABLE "my_app_person" ADD CONSTRAINT "my_app_person_user_id_5cc76d77_fk_auth_user_id" FOREIGN KEY ("user_id") REFERENCES "auth_user" ("id") DEFERRABLE INITIALLY DEFERRED;
COMMIT;
~~~

## Applying Migration

~~~
python3 manage.py migrate
~~~

## Adding an admin user again

~~~
python3 manage.py createsuperuser
~~~

## Running the Server

Running the server. Inside the root `my_project`:

~~~
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
