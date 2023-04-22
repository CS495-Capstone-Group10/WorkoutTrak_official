from django.contrib import admin
from app.models import Order, CustomUser, Group, Workout, Athlete

@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'id', 'description', 'date_created', 'member_count')

@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'id', 'first_name', 'last_name', 'email')

@admin.register(Workout)
class GroupAdmin(admin.ModelAdmin):
    list_display = ( 'date','id')
          
admin.site.register(Order)
admin.site.register(Athlete)
#admin.site.register(CustomUser)
#admin.site.register(Profile)
#admin.site.register(Group)
#admin.site.register(Workout)