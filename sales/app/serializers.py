from rest_framework import serializers
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ["id", "username", "password"] # TODO Add more fields later

    def create(self, validated_data):
        user = UserProfile.objects.create(
                                          username=validated_data['username']
                                         )
        
        user.set_password(validated_data['password'])
        user.save()
        return user