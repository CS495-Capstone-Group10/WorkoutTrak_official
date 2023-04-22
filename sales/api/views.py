from django.shortcuts import render
from django.http import JsonResponse, Http404
from rest_framework.decorators import api_view # For function based view decorater
from rest_framework.response import Response
from .serializers import CustomUserSerializer, GroupSerializer, WorkoutSerializer, AthleteSerializer
from app.models import CustomUser, Group, Workout, Athlete
from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework_simplejwt.tokens import AccessToken

# Create your views here.

class UserList(generics.ListAPIView): # List Users
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    pass
class GroupList(generics.ListCreateAPIView): # List and Create Groups
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    pass

class GroupEdit(generics.RetrieveUpdateDestroyAPIView): # List and Create Groups
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    lookup_field='pk'
    pass

# class WorkoutListCreate(generics.ListCreateAPIView):
#     queryset = Workout.objects.all()
#     serializer_class = WorkoutSerializer

class WorkoutCreate(generics.CreateAPIView):
    serializer_class = WorkoutSerializer

class WorkoutEdit(generics.RetrieveUpdateAPIView):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    lookup_field='pk'
    
    # Athlete Views
class AthleteCreate(generics.CreateAPIView):
    serializer_class = AthleteSerializer

class AthleteEdit(generics.RetrieveUpdateAPIView):
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    lookup_field='pk'
    
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

class UserInfo(APIView):
    """Retrieve, update, or delete a customUser
        id(Static), username, and group_membership for user
    """
    
    def get_object(self, username): # Gets object
        try:
            return CustomUser.objects.get(username=username)
        except CustomUser.DoesNotExist:
            raise Http404
    
    def get(self, request, username, format=None): #Retrieve 
        user = self.get_object(username)
        serializer = CustomUserSerializer(user, many=False)
        # Get the JWT token from the Authorization header
        #token = request.headers.get('Authorization', '').split(' ')[0]
        #print(request.data)
        
        #serializer_class = MyTokenObtainPairSerializer(token)
        #print(type(token))
        return Response(request.user)
        # Decode the JWT token using SimpleJWT's AccessToken class
        access_token = AccessToken(token)
        payload = access_token.payload  # Access the payload of the JWT token

        # Access the data in the payload, such as the user ID
        user_id = payload['user_id']
        
        return Response(user_id)
        return Response(serializer.data) 

    def post(self, request, username, format=None): # Update
        user = self.get_object(username)
        serializer = CustomUserSerializer(user, data=request.data, partial=True) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None): # Delete
        user = self.get_object(username)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class GroupInfo(APIView):
    """Retrieve, update, or delete a customUser
        id(Static), username, and group_membership for user
    """
    
    def get_object(self, name): # Gets object
        try:
            return Group.objects.get(name=name)
        except Group.DoesNotExist:
            raise Http404
        
    def get(self, request, name, format=None): #Retrieve 
        user = self.get_object(name)
        serializer = GroupSerializer(user, many=False)
        return Response(serializer.data) 

    def post(self, request, name, format=None): # Update
        user = self.get_object(name)
        serializer = GroupSerializer(user, data=request.data, partial=True) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, name, format=None): # Delete
        user = self.get_object(name)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def userList(request):
    users = CustomUser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    #print(serializer.data, "\n\n", type(serializer.data))
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
def workoutDetail(request,pk):
    workout = Workout.objects.all(id=pk)
    serializer = WorkoutSerializer(workout, many=False)
    return Response(serializer.data)

# GROUP CRUD
@api_view(['GET'])
def groupDetail(request,pk):
    group = Group.objects.get(id=pk)
    serializer = GroupSerializer(group, many=False)
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

@api_view(['POST'])
def joinGroup(request,pk): # pk = CustomUser.id
    user_group_membership = CustomUser.objects.get(id=pk) # Update group in Customuser
    serializer = CustomUserSerializer(instance=user_group_membership, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        
    return Response("Group successfully joined")
# Workouts CRUD