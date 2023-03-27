from django.shortcuts import render
from rest_framework import viewsets
from .models import Workout
from .serializer import WorkoutSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer




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
def save_workouts(request):
    context = {}
    return render(request, "new_workouts.html", context=context)

def new_workouts(request):
    context = {}
    return render(request, "new.html", context=context)