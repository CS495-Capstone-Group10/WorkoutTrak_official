from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from . import views
from .views import RegisterUserView

urlpatterns = [
    path('', views.login_view, name='login'),
    #path('', views.login_view, name='apiTes'),
    path('create-account/', views.create_account_view, name='sign_up'),
    path('api/create-account/', RegisterUserView.as_view() , name='sign_up_api'),
    path('forgot-password', RegisterUserView.as_view(), name='reset_password'),
    path('api/token/', TokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('login', views.login_view),
    #path('bio/<username>', views.UserProfile),
]