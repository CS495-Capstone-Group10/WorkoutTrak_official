from django.shortcuts import render

# added new imports for login and signup
from rest_framework import generics, permissions, status
#from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
#from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .models import User



def index(request):
    context = {}
    return render(request, "index.html", context=context)


def login_view(request):
    context = {}
    return render(request, "login.html", context=context)


# added this for the athletes page
def athletes(request):
    context = {}
    return render(request, "athletes.html", context=context)

def workouts_view(request):
    context = {}
    return render(request, "workouts.html", context=context)


# added this for uploadDoc page
def uploadDoc_view(request):
    context = {}
    return render(request, "uploadDoc.html", context=context)


# added this for signup and login
class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

# added this for signup and login
class LoginView(APIView):
    serializer_class = TokenObtainPairSerializer
    permission_classes = [permissions.AllowAny]
    
    
    # def post(self, request):
    #     email = request.data.get('email')
    #     password = request.data.get('password')
        
    #     user = authenticate(request, email=email, password=password)
    #     if user:
    #         refresh = RefreshToken.for_user(user)
    #         return Response({'access': str(refresh.access_token)})
    #     else:
    #         return Response({'error': 'Invalid Credentials'})
