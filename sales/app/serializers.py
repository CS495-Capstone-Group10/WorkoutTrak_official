
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
    


#<<<<<<< IsaacWork2.2
# from rest_framework import serializers
# from .models import CustomUser

# # for setting up users
# # used for validating user input when making new users
# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
        
#     def create(self, validated_data):
#         user = CustomUser.objects.create(email=validated_data['email'], name=validated_data['name'])
        
#         user.set_password(validated_data['password'])
#         user.save()
#         return user
    
#     class Meta:
#         model = CustomUser
#         fields= ('email', 'name', 'password')
#         #fields = ['id', 'email', 'name', 'password']
#         #extra_kwargs ={'password': {'write_only': True}}