from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    #path('users/<str:username>/', views.UserInfo.as_view()),
    path('user-list/', views.UserList.as_view(), name="user-list"),
    path('group-list/', views.GroupList.as_view(), name="group-list"),
   # path('users/', views.UserInfo.as_view()),
    path('group/<str:pk>/', views.GroupEdit.as_view(), name="group-edit"),
    
    #path('user-list/', views.userList, name="user-list"),
    
    #path('workout-list/', views.workoutList, name="workout-list"),
    
    path('user-detail/<str:pk>/', views.userDetail, name="user-detail"),
    
    #path('workout-detail/<str:pk>/', views.workoutDetail, name="workout-detail"),

    path('group-detail/<str:pk>/', views.groupDetail, name="group-detail"),
    path('create-group/', views.createGroup, name="create-group"),
    path('update-group/<str:pk>/', views.updateGroup, name="update-group"),
    path('delete-group/<str:pk>/', views.deleteGroup, name="delete-group"),
    
    path('join-group/<str:pk>/', views.joinGroup, name="join-group"),
    
    
]
# added this static line above