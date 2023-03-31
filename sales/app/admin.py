from django.contrib import admin
from app.models import Order, CustomUser, Profile, Group, Workout


admin.site.register(Order)
admin.site.register(CustomUser)
admin.site.register(Profile)
admin.site.register(Group)
admin.site.register(Workout)

