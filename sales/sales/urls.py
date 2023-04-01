from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from django.contrib import admin
from django.urls import path, include
from app import views_orders
from app import views
from app import views_workouts
# library JWT for authentication
#from sales import settings 
from django.conf.urls.static import static
from django.conf import settings 




#from app.views import SignUpView, LoginView

# added this from the app view.py
#from . import views
from app.views import RegisterUserView

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
    path('save',views.save_workouts),
    path('new',views.new_workouts),
    path('api/workouts/', views_workouts.workouts),
    path('api/workouts/<int:workout_id>/', views_workouts.workout),
    path('app/', include('app.urls')),
    path('create-account/', views.create_account_view, name='sign_up'),
    path('api/create-account/', RegisterUserView.as_view() , name='sign_up_api'),
    path('forgot-password', RegisterUserView.as_view(), name='reset_password'),
    path('index1', views.index1),
    path('index2', views.index2),
    path('app2', views.app2),
    #path('style.css', style.css),
    #path('style1', views.style1_view), #experimental
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
