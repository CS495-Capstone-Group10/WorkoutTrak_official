from rest_framework import serializers
from app.models import CustomUser, Group, Workout, Athlete
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Serializers convert data from database to convert to a readable format such as JSON to the application
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
        #fields = ['distance_meters']
        fields = '__all__'
        
class AthleteSerializer(serializers.ModelSerializer): # TODO limit fields
    class Meta:
        model = Athlete
        fields = '__all__'
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['user_id'] = user.user_id
        return token