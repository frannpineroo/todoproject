from django.shortcuts import render
from .models import Task

def task_list(request):
    tasks = Task.objects.all()  # Obtiene todas las tareas de la base de datos
    return render(request, 'tasks/task_list.html', {'tasks': tasks})