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
from django.urls import include, path

from . import views

urlpatterns = [
    path('about/', views.index, name="index"),
]
~~~

Connecting to the main route (`platform_03_rest/urls.py`):

~~~python
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('plot.urls')),
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
from django.db import models

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

## Expanding the venv

Inside the venv:

~~~
pip install djangorestframework
pip install markdown
pip install django-filter
~~~

## Expanding to REST

* souce: https://www.django-rest-framework.org/#installation

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

Create an API specification for plots and comments (`plot/api.py`). Details of ViewSet customization applied to CommentViewSet can be found at: https://www.django-rest-framework.org/api-guide/viewsets/#modelviewset.

~~~python
from rest_framework import routers, serializers, viewsets

from .models import Plot, Comment

class PlotSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Plot
        fields = ['id', 'title', 'content', 'created_at']

class PlotViewSet(viewsets.ModelViewSet):
    queryset = Plot.objects.all()
    serializer_class = PlotSerializer

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    plot_id = serializers.PrimaryKeyRelatedField(queryset=Plot.objects.all())
    
    class Meta:
        model = Comment
        fields = ['id', 'plot_id', 'text', 'grade']

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        plot_id = self.request.query_params.get('plot_id')
        if plot_id is not None:
            return Comment.objects.filter(plot_id=plot_id)
        return Comment.objects.all()

router = routers.DefaultRouter()
router.register(r'plot', PlotViewSet, basename='plot')
router.register(r'comment', CommentViewSet, basename='comment')
~~~

Create the complete API specification file (`platform_03_rest/api.py`), importing the plot API and adding routes to access administrative data - users:

~~~python
from rest_framework import routers, serializers, viewsets

from django.contrib.auth.models import User
from plot.apis import router as plot_router

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
router.registry.extend(plot_router.registry)
~~~

Expand the `platform_03_rest/urls.py`:

~~~python
from django.contrib import admin
from django.urls import include, path
from . import api

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(api.router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', include('plot.urls')),
    path('admin/', admin.site.urls),
]
~~~

## Running the Server

Running a Virtual Environment for Django

~~~
source .venv/bin/activate
~~~

Running the server

~~~
cd platform_03_rest

python3 manage.py runserver
~~~

## Postman API Access

Import specification: Plots.postman_collection.json

* api access: http://127.0.0.1:8000/
* admin address: http://127.0.0.1:8000/admin/
* page address: http://127.0.0.1:8000/plot/about/