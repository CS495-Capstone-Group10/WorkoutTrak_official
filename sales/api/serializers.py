from rest_framework import serializers
from app.models import CustomUser, Group, Workout

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        
class GroupSerializer(serializers.ModelSerializer): # TODO limit fields
    class Meta:
        model = Group
        fields = '__all__'
        
class WorkoutSerializer(serializers.ModelSerializer): # TODO limit fields
    class Meta:
        model = Workout
        fields = '__all__'