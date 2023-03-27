from django.shortcuts import render
from rest_framework import viewsets
from .models import Workout
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
<<<<<<< HEAD
def save_workouts(request):
    context = {}
    return render(request, "new_workouts.html", context=context)

def new_workouts(request):
    context = {}
    return render(request, "new.html", context=context)
=======


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
        

>>>>>>> 4071d59b5fd5776bc22eced1f8c948c15cee8286
