from django.urls import include, path

from . import views

urlpatterns = [
    path('about/my_app/', views.index, name="index"),
]