from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)
from . import views
from .views import RegisterUserView

# added for index1 and static line below
#from sales import settings 
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index),
    
    # Login URLs
    path('login/', views.login_view, name='login'),
    path('api/token/', TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('create-account/', views.create_account_view, name='create_account'),
    path('api/create-account/', RegisterUserView.as_view() , name='sign_up_api'),
    path('forgot-password/', RegisterUserView.as_view(), name='reset_password'), # TODO implement
    
    # Profile URLs
    path('profile/<str:username_name_pk>/', views.profile), #Dynamic URL for for profile page
    path('home', views.home),
    
    #path('bio/<username>', views.UserProfile),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# added this static line above