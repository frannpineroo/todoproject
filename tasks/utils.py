from .models import Task

class TaskList:
    def __init__(self):
        self.tasks = Task.objects.all()

    def add_task(self, title, description=''):
        """ Añade una nueva tarea a la lista """
        task = Task(title=title, description=description)
        task.save()
    
    def remove_task(self, task_id):
        Task.objects.filter(id=task_id).delete()

    def get_tasks(self, completed=None):
        """ Obtiene todas las tareas, o filtradas por estado de completado """
        if completed is None:
            return Task.objects.all()
        return Task.objects.filter(completed=completed)
    
    def __str__(self):
        return f"TaskList con {self.tasks.count()} tareas"