from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('user-list/', views.userList, name="user-list"),
    path('group-list/', views.groupList, name="group-list"),
    #path('workout-list/', views.workoutList, name="workout-list"),
    
    path('user-detail/<str:pk>/', views.userDetail, name="user-detail"),
    
    #path('workout-detail/<str:pk>/', views.workoutDetail, name="workout-detail"),

    path('group-detail/<str:pk>/', views.groupDetail, name="group-detail"),
    path('create-group/', views.createGroup, name="create-group"),
    path('update-group/<str:pk>/', views.updateGroup, name="update-group"),
    path('delete-group/<str:pk>/', views.deleteGroup, name="delete-group"),
    
    
]
# added this static line above