from django.shortcuts import render


def index(request):
    context = {}
    return render(request, "index.html", context=context)


def login_view(request):
    context = {}
    return render(request, "login.html", context=context)

def workouts_view(request):
    context = {}
    return render(request, "workouts.html", context=context)
