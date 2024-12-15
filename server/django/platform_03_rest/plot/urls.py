from django.urls import path

from . import views

urlpatterns = [
    path('about/', views.index, name="index"),
]
