from rest_framework import serializers
from app.models import CustomUser, Group, Workout

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'group_membership']
        #fields = '__all__'
        
class GroupSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Group
        #fields = ['id', 'name', 'description', ]
        fields = '__all__'
        
class WorkoutSerializer(serializers.ModelSerializer): # TODO limit fields
    class Meta:
        model = Workout
        fields = '__all__'