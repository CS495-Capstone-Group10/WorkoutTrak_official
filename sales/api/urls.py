from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    #path('users/<str:username>/', views.UserInfo.as_view()),
    path('user-list/', views.UserList.as_view(), name="user-list"),
    path('group-list/', views.GroupList.as_view(), name="group-list"),
   # path('users/', views.UserInfo.as_view()),
    path('group/<str:pk>/', views.GroupEdit.as_view(), name="group-edit"),
    path('workout/create/', views.WorkoutCreate.as_view(), name="workout-listcreate"),
    path('workout/<str:pk>/', views.WorkoutEdit.as_view(), name="workout-edit"),
    
    # path('athlete/', views.AthleteList.as_view(), name="athlete-list"),
    path('athlete/create/', views.AthleteCreate.as_view(), name="athlete-listcreate"),
    path('athlete/<str:pk>/', views.AthleteEdit.as_view(), name="athlete-edit"),
    
    path('athlete/', views.athletes),
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