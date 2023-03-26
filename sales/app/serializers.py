from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ["id", "username", "password"] # TODO Add more fields later

    def create(self, validated_data):
        user = CustomUser.objects.create(
                                          username=validated_data['username']
                                         )
        
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class ResetPasswordProfile(serializers.ModelSerializer):
    model = CustomUser
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    