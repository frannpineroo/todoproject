from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200) # Titulo de la tarea
    description = models.TextField(blank=True) # Descripcion de la tarea
    completed = models.BooleanField(default=False) # Estado de la tarea, por defecto es False

    def mark_complete(self):
        """ Marca la tarea como completada """
        self.completed = True
        self.save()

    def __str__(self):
        return f"{self.title} - {'✅' if self.completed else '❌'}"
