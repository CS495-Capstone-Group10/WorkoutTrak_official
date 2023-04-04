from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view # For function based view decorater
from rest_framework.response import Response
from .serializers import CustomUserSerializer, GroupSerializer, WorkoutSerializer
from app.models import CustomUser, Group, Workout
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List' : '/task-list',
        'Detail View' : '/task-detail/<str:pk>/',
        'Create' : '/task-create/',
        'Update' : '/task-update/<str:pk>/',
        'Delete' : '/task-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def userList(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def groupList(request):
    group = Group.objects.all()
    serializer = GroupSerializer(group, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def workoutList(request):
    workout = Workout.objects.all()
    serializer = WorkoutSerializer(workout, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def userDetail(request,pk):
    user = CustomUser.objects.get(username=pk)
    serializer = CustomUserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def groupDetail(request,pk):
    group = Group.objects.get(id=pk)
    serializer = GroupSerializer(group, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def workoutDetail(request,pk):
    workout = Workout.objects.all(id=pk)
    serializer = WorkoutSerializer(workout, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createGroup(request):
    serializer = GroupSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['POST'])
def updateGroup(request,pk):
    group = Group.objects.get(id=pk)
    serializer = GroupSerializer(instance=group, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteGroup(request,pk):
    group = Group.objects.get(id=pk)
    group.delete()
    return Response("Item successfully deleted")