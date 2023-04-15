from rest_framework.decorators import api_view
from django.shortcuts import HttpResponse
from rest_framework import status
from django.forms.models import model_to_dict
from django.core.exceptions import ObjectDoesNotExist
from app.models import Workout
import json
import datetime
from rest_framework import serializers


def serialize_order(workout):
    serialized = model_to_dict(workout)
    serialized["date"] = str(workout.date)
    serialized["type"] = str(workout.type)
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
    serialized["split_length"] = str(workout.split_length)
    serialized["workoutType"] = str(workout.workoutType)
    serialized["intervalVariableType"] = str(workout.intervalVariableType)
    serialized["workoutTime"] = str(workout.workoutTime)
    return serialized

@api_view(['GET', ])
def workouts(request):
    if request.user.is_anonymous:
        return HttpResponse(json.dumps({"detail": "Not authorized"}), status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        Workout_data = Workout.objects.all()

        Workout_count = Workout_data.count()

        page_size = int(request.GET.get("page_size", "10"))
        page_no = int(request.GET.get("page_no", "0"))
        Workout_data = list(Workout_data[page_no * page_size:page_no * page_size + page_size])

        Workout_data = [serialize_order(order) for order in Workout_data]
        return HttpResponse(json.dumps({"count": Workout_count, "data": Workout_data}), status=status.HTTP_200_OK)

    return HttpResponse(json.dumps({"detail": "Wrong method"}), status=status.HTTP_501_NOT_IMPLEMENTED)


@api_view(['GET', 'DELETE'])
def workout(request, Workout_id):
    if request.user.is_anonymous:
        return HttpResponse(json.dumps({"detail": "Not authorized"}), status=status.HTTP_401_UNAUTHORIZED)

    try:
        workout = Workout.objects.get(pk=Workout_id)
    except ObjectDoesNotExist:
        return HttpResponse(json.dumps({"detail": "Not found"}), status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return HttpResponse(json.dumps({"data": serialize_order(workout)}), status=status.HTTP_200_OK)
    if request.method == "DELETE":
        workout.delete()
        return HttpResponse(json.dumps({"detail": "deleted"}), status=status.HTTP_410_GONE)
    return HttpResponse(json.dumps({"detail": "Wrong method"}), status=status.HTTP_501_NOT_IMPLEMENTED)

def save_workout(request, workout, success_status):
    errors = []
    date = request.data.get("date", "")
    type = request.data.get("type", "")
    id = datetime.datetime.now()
    distance_meters = distance_meters.data.get("type", "")
    time_minutes = time_minutes.data.get("date", "")
    time_seconds = time_seconds.data.get("type", "")
    split_length_minutes = split_length_minutes.data.get("date", "")
    split_length_seconds = split_length_seconds.data.get("type", "")
    num_intervals = num_intervals.data.get("id", "")
    distanceInt = distanceInt.data.get("type", "")
    int_time_minutes = int_time_minutes.data.get("date", "")
    int_time_sec = int_time_sec.data.get("type", "")
    rest_time_minutes = rest_time_minutes.data.get("date", "")
    rest_time_sec = rest_time_sec.data.get("type", "")
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

    return HttpResponse(json.dumps({"data": serialize_order(workout)}), status=success_status)

@api_view(['GET', 'POST'])
def orders(request):
    if request.user.is_anonymous:
        return HttpResponse(json.dumps({"detail": "Not authorized"}), status=status.HTTP_401_UNAUTHORIZED)

    if request.method == "GET":
        orders_data = Workout.objects.all()

        orders_count = orders_data.count()

        page_size = int(request.GET.get("page_size", "10"))
        page_no = int(request.GET.get("page_no", "0"))
        orders_data = list(orders_data[page_no * page_size:page_no * page_size + page_size])

        orders_data = [serialize_order(order) for order in orders_data]
        return HttpResponse(json.dumps({"count": orders_count, "data": orders_data}), status=status.HTTP_200_OK)

    if request.method == "POST":
        order = Workout()
        return save_workout(request, order, status.HTTP_201_CREATED)

    return HttpResponse(json.dumps({"detail": "Wrong method"}), status=status.HTTP_501_NOT_IMPLEMENTED)


@api_view(['GET', 'PUT', 'DELETE'])
def order(request, workout_id):
    if request.user.is_anonymous:
        return HttpResponse(json.dumps({"detail": "Not authorized"}), status=status.HTTP_401_UNAUTHORIZED)

    try:
        workout = Workout.objects.get(pk=workout_id)
    except ObjectDoesNotExist:
        return HttpResponse(json.dumps({"detail": "Not found"}), status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return HttpResponse(json.dumps({"data": serialize_order(workout)}), status=status.HTTP_200_OK)

    if request.method == "PUT":
        return save_workout(request, workout, status.HTTP_200_OK)

    if request.method == "DELETE":
        workout.delete()
        return HttpResponse(json.dumps({"detail": "deleted"}), status=status.HTTP_410_GONE)

    return HttpResponse(json.dumps({"detail": "Wrong method"}), status=status.HTTP_501_NOT_IMPLEMENTED)