from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)


from . import views
from .views import RegisterUserView

urlpatterns = [
    path('a', views.login_view, name='login'),
    path('', views.login_view, name='apiTes'),
    path('api/register/', RegisterUserView.as_view(), name='sign_up'),
    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    #path('login/', LoginView.as_view(), name='register'),
]