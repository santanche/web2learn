from django.urls import include, path

from . import views

urlpatterns = [
    path('plot/about/', views.index, name="index"),
]
