from django.shortcuts import render
from rest_framework import viewsets
from .models import Workout, CustomUser
from .serializer import WorkoutSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer



from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from rest_framework.response import Response




def index(request):
    context = {}
    return render(request, "index.html", context=context)


# new separate index page with design elements
def index1(request):
    context = {}
    return render(request, "index1.html", context=context)

# another new separate index page with design elements 
def index2(request):
    context = {}
    return render(request, "index2.html", context=context)

def app2(request):
    context = {}
    return render(request, "app2.js", context=context)

def tech2(request):
    context = {}
    return render(request, "tech2.html", context=context)


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

def save_workouts(request):
    context = {}
    return render(request, "new_workouts.html", context=context)

def new_workouts(request):
    context = {}
    return render(request, "new.html", context=context)

#def style1_view(request):
#    context ={}
#    return render(request, "style1.css", context=context)




# view for registering users

def create_account_view(request):
        context = {}
        return render(request, "createAccount.html", context=context)

class RegisterUserView(APIView):
    def post(self, request):
        if request.method == 'POST':
            serializer = CustomUserSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
    def get(self, request):
        if request.method == 'GET':
            return Response({"message": "Enter Username and Password"})
        
        
def home(request): # Default homepage for after login
    return render(request, "accounts/dashboard.html")


def profile(request, username_name_pk):
    profile = CustomUser.objects.get(username=username_name_pk)
    return render(request, "accounts/profile.html", {'profile': profile})




# adding views for the sprint2 demo urls.py paths
def pracX1_view(request):
    context = {}
    return render(request, "pracX1.html", context=context)

def pracX2_view(request):
    context = {}
    return render(request, "pracX2.html", context=context)

def loginX_view(request):
    context = {}
    return render(request, "loginX.html", context=context)

def homeX_view(request):
    context = {}
    return render(request, "homeX.html", context=context)

def workoutsX_view(request):
    context = {}
    return render(request, "workoutsX.html", context=context)

def athletesX_view(request):
    context = {}
    return render(request, "athletesX.html", context=context)

def profileX_view(request):
    context = {}
    return render(request, "profileX.html", context=context)

def profile2X_view(request):
    context = {}
    return render(request, "profile2X.html", context=context)

def socialX_view(request):
    context = {}
    return render(request, "socialX.html", context=context)

def social2X_view(request):
    context = {}
    return render(request, "social2X.html", context=context)

def recordsX_view(request):
    context = {}
    return render(request, "recordsX.html", context=context)

def createAccountX_view(request):
    context = {}
    return render(request, "createAccountX.html", context=context)

def upDocX_view(request):
    context = {}
    return render(request, "upDocX.html", context=context)

