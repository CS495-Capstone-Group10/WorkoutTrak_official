from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view # For function based view decorater
from rest_framework.response import Response
from .serializers import CustomUserSerializer
from app.models import CustomUser, Group
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
def userDetail(request,pk):
    user = CustomUser.objects.get(username=pk)
    serializer = CustomUserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createGroup(request,pk):
    user = Group.objects.get()
    serializer = CustomUserSerializer(user, many=False)
    return Response(serializer.data)