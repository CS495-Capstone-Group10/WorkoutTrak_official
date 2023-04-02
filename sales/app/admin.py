from django.contrib import admin
<<<<<<< HEAD
from app.models import Order, CustomUser, Workout
=======
from app.models import Order, CustomUser, Group, Workout
>>>>>>> 89f5375b2cacd56866ae5941296691a995ca5730


admin.site.register(Order)
admin.site.register(CustomUser)
<<<<<<< HEAD
=======
#admin.site.register(Profile)
admin.site.register(Group)
>>>>>>> 89f5375b2cacd56866ae5941296691a995ca5730
admin.site.register(Workout)

