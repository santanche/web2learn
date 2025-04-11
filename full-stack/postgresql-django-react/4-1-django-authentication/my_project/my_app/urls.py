from django.urls import path
from .views import GoogleAuthView, UserView

urlpatterns = [
    path('auth/google/', GoogleAuthView.as_view(), name='google-auth'),
    path('user/', UserView.as_view(), name='user'),
]
