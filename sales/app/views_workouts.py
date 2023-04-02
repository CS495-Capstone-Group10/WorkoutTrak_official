from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from app.models import Workout
import json
import datetime
from app.serializer import WorkoutSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.decorators import login_required

def serialize_workout(workout):
    serialized = model_to_dict(workout)
    serialized["date"] = str(workout.date)
    serialized["type"] = str(workout.amount)
    serialized["id"] = int(workout.id)
    serialized["distance_meters"] = int(workout.distance_meters)
    serialized["time_minutes"] = int(workout.time_minutes)
    serialized["time_seconds"] = int(workout.time_seconds)
    serialized["split_length_minutes"] = int(workout.split_length_minutes)
    serialized["split_length_seconds"] = int(workout.split_length_seconds)
    serialized["num_intervals"] = int(workout.num_intervals)
    serialized["distanceInt"] = int(workout.distanceInt)
    serialized["int_time_minutes"] = int(workout.int_time_minutes)
    serialized["int_time_sec"] = int(workout.int_time_sec)
    serialized["rest_time_minutes"] = int(workout.rest_time_minutes)
    serialized["rest_time_sec"] = int(workout.rest_time_sec)
    return serialized


@api_view(['GET'])
@login_required
def get_workouts(request):
    page_size = int(request.GET.get("page_size", "10"))
    page_no = int(request.GET.get("page_no", "0"))

    workouts = Workout.objects.all()[page_no * page_size:page_no * page_size + page_size]
    serialized_workouts = [serialize_workout(workout) for workout in workouts]
    return Response({"count": Workout.objects.count(), "data": serialized_workouts}, status=status.HTTP_200_OK)


@api_view(['POST'])
@login_required
def create_workout(request):
    serializer = WorkoutSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@login_required
@api_view(['GET', 'DELETE'])
def manage_workout(request, workout_id):
    try:
        workout = Workout.objects.get(pk=workout_id)
    except ObjectDoesNotExist:
        return HttpResponse(json.dumps({"detail": "Not found"}), status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serialized_workout = serialize_workout(workout)
        return Response({"data": serialized_workout}, status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        workout.delete()
        return Response({"detail": "deleted"}, status=status.HTTP_410_GONE)
    else:
        return Response({"detail": "Wrong method"}, status=status.HTTP_501_NOT_IMPLEMENTED)


def save_workout(request, workout, success_status):
    errors = []
    date = request.data.get("date", "")
    type = request.data.get("type", "")
    distance_meters = request.data.get("distance_meters", "")
    time_minutes = request.data.get("time_minutes", "")
    time_seconds = request.data.get("time_seconds", "")
    split_length_minutes = request.data.get("split_length_minutes", "")
    split_length_seconds = request.data.get("split_length_seconds", "")
    num_intervals = request.data.get("num_intervals", "")
    distanceInt = request.data.get("distanceInt", "")
    int_time_minutes = request.data.get("int_time_minutes", "")
    int_time_sec = request.data.get("int_time_sec", "")
    rest_time_minutes = request.data.get("rest_time_minutes", "")
    rest_time_sec = request.data.get("rest_time_sec", "")
    if date == "":
        date = datetime.datetime.now()

    if len(errors) > 0:
        return HttpResponse(json.dumps(
            {
                "errors": errors
            }), status=status.HTTP_400_BAD_REQUEST)

    try:
        workout.date = date
        workout.type = type
        workout.id = id
        workout.distance_meters = distance_meters
        workout.time_minutes = time_minutes
        workout.time_seconds = time_seconds
        workout.split_length_minutes = split_length_minutes
        workout.split_length_seconds = split_length_seconds
        workout.num_intervals = num_intervals
        workout.distanceInt = distanceInt
        workout.int_time_minutes = int_time_minutes
        workout.int_time_sec = int_time_sec
        workout.rest_time_minutes = rest_time_minutes
        workout.rest_time_sec = rest_time_sec
        workout.save()
    except Exception as e:
        return HttpResponse(json.dumps(
            {
                "errors": {"Order": str(e)}
            }), status=status.HTTP_400_BAD_REQUEST)

    return HttpResponse(json.dumps({"data": serialize_workout(workout)}), status=success_status)

class Workouts(APIView):
    def get(self, request):
        workouts = Workout.objects.all()
        serializer = WorkoutSerializer(workouts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WorkoutSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        workout = Workout.objects.get(pk=pk)
        serializer = WorkoutSerializer(workout, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        workout = Workout.objects.get(pk=pk)
        workout.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

