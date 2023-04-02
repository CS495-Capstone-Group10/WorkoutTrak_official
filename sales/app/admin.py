from django.contrib import admin
from app.models import Order, CustomUser, Workout


admin.site.register(Order)
admin.site.register(CustomUser)
admin.site.register(Workout)

