from django.urls import include, path

from . import views

urlpatterns = [
    path('about/person/', views.index, name="index"),
]
