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
