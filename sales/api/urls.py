from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('user-list/', views.userList, name="user-list"),
    path('user-detail/<str:pk>/', views.userDetail, name="user-detail"),
    
]
# added this static line above