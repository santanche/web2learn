from django.urls import path
from .views import GoogleAuthView, UserProfileView

urlpatterns = [
    path('auth/google/', GoogleAuthView.as_view(), name='google-auth'),
    path('user/profile/', UserProfileView.as_view(), name='user-profile'),
]
