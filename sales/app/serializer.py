from rest_framework import serializers
from .models import Workout, WorkoutItem

class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = '__all__'

class WorkoutItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkoutItem
        fields = '__all__'
