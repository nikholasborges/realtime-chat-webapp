from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def index(request):
    return render(request, './html/login.html', {})


def chat(request, room_name):
    return render(request, './html/chat.html', {
        'room_name': room_name
    })
