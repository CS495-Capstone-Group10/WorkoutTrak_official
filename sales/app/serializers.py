from rest_framework import serializers
from .models import User

# for setting up users
# used for validating user input when making new users
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
        
    def create(self, validated_data):
        user = User.objects.create(email=validated_data['email'], name=validated_data['name'])
        
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    class Meta:
        model = User
        fields= ('email', 'name', 'password')
        #fields = ['id', 'email', 'name', 'password']
        #extra_kwargs ={'password': {'write_only': True}}