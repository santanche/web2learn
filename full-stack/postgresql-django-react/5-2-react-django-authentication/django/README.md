# Virtual Environment

## Creating a Virtual Environment for Django

~~~
python3 -m venv .venv
~~~

## Running a Virtual Environment for Django

~~~
source .venv/bin/activate
~~~

### Manual Approach

~~~
python3 -m pip install Django
pip install djangorestframework
pip install markdown
pip install django-filter
pip install django-cors-headers google-auth
pip install requests
~~~

### Requirements Approach

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

# Django Project

## Creating a Django Project

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial01/

~~~
django-admin startproject full_stack_user

cd full_stack_user
~~~

## Creating an App inside a Project

~~~
python3 manage.py startapp user
~~~

## Update Settings

Adding in `full_stack_user/settings.py`:

~~~python
AUTH_USER_MODEL = 'user.User' # replace the default user

INSTALLED_APPS = [
    # ...
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'user'
]

MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware'
]

# ... <end>

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React app URL
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

# Google OAuth settings
GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'
~~~

## Creating a Database

* source: https://docs.djangoproject.com/en/5.1/intro/tutorial02/

Changing `user/models.py`

~~~python
import uuid
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    google_id = models.CharField(max_length=100, blank=True, null=True)
    profile_picture = models.URLField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.user.username

# Automatically create or update UserProfile when User is created/updated
@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        instance.profile.save()
~~~

## Creating the View

Changing the `user/views.py`:

~~~python
from django.conf import settings
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from google.oauth2 import id_token
from google.auth.transport import requests
from .models import UserProfile

class GoogleAuthView(APIView):
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
            name = idinfo.get('name', '')
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
            
            # Update or create profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.google_id = google_id
            profile.profile_picture = profile_picture
            profile.save()
            
            # Create or get authentication token
            token, created = Token.objects.get_or_create(user=user)
            
            # Return user data and token
            return Response({
                'token': token.key,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': f"{user.first_name} {user.last_name}".strip(),
                    'picture': profile.profile_picture
                }
            })
            
        except ValueError:
            # Invalid token
            return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserProfileView(APIView):
    def get(self, request):
        user = request.user
        
        if not user.is_authenticated:
            return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({
            'id': user.id,
            'email': user.email,
            'name': f"{user.first_name} {user.last_name}".strip(),
            'picture': user.profile.profile_picture if hasattr(user, 'profile') else None
        })
~~~

## Define Endpoints

Adding a local route (`user/urls.py`):

~~~python
from django.urls import path
from .views import GoogleAuthView, UserProfileView

urlpatterns = [
    path('auth/google/', GoogleAuthView.as_view(), name='google-auth'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
]
~~~

Connecting to the main route (`full_stack_user/urls.py`):

~~~python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('user.urls'))
]
~~~

## Building a Migration Code

~~~
python3 manage.py makemigrations user
~~~

## Shows the SQL that creates the tables

~~~
python3 manage.py sqlmigrate user 0001
~~~

## Applying Migration

~~~
python3 manage.py migrate
~~~

## Adding in the admin panel

File `user/admin.py`:

~~~python
from django.contrib import admin

from .models import User

admin.site.register(User)
~~~

## Adding an admin user

~~~
python3 manage.py createsuperuser
~~~

## Running the Server

Running the server

~~~
cd full_stack_user

python3 manage.py runserver
~~~

## Postman API Access

Import specification: Plots.postman_collection.json

* api access: http://127.0.0.1:8000/
* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/plot/about/