from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from django.contrib import admin
from django.urls import path
from app import views_orders
from app import views
# library JWT for authentication
from sales import settings 
from django.conf.urls.static import static

from app.views import SignUpView, LoginView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
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
    # added next two for login and signup
    path('signup/', SignUpView.as_view(), name='signup'),
    #path('login/', LoginView.as_view(), name='login'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
