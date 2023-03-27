from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from django.contrib import admin
from django.urls import path, include
from app import views_orders
from app import views
from app import views_workouts
# library JWT for authentication
from sales import settings 
from django.conf.urls.static import static

<<<<<<< HEAD

=======
#from app.views import SignUpView, LoginView
>>>>>>> 4071d59b5fd5776bc22eced1f8c948c15cee8286

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # TODO Remove JWT token and use urls.py from apps to improve modularity
    path('api/orders/', views_orders.orders),
    path('api/orders/<int:order_id>/', views_orders.order),
    # added path to athletes
    path('athletes', views.athletes),
    path('', views.index),
    path('index', views.index),
    path('login', views.login_view),
    path('workouts', views.workouts_view),
    # added path to uploadDoc
    path('upDoc', views.uploadDoc_view),
<<<<<<< HEAD
    path('save',views.save_workouts),
    path('new',views.new_workouts),
    path('api/workouts/', views_workouts.workouts),
    path('api/workouts/<int:workout_id>/', views_workouts.workout),
=======
    path('app/', include('app.urls'))
>>>>>>> 4071d59b5fd5776bc22eced1f8c948c15cee8286
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
