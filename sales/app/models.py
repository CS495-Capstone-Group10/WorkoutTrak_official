from django.db import models


# the model being used for a basic table on the website
class Order(models.Model):
    date = models.DateField(blank=False)
    item = models.CharField(max_length=100, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    quantity = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)

    def __str__(self):
        return f"{self.date}: {self.item}"

    class Meta:
        ordering = ["-id"]


class Workout(models.Model):
    TYPE_CHOICES = (
        ('single_distance', 'Single Distance'),
        ('single_time', 'Single Time'),
        ('intervals', 'Intervals'),
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    date = models.DateField()
    distance_meters = models.IntegerField(blank=True, null=True)
    time_minutes = models.IntegerField(blank=True, null=True)
    time_seconds = models.IntegerField(blank=True, null=True)
    split_length_minutes = models.IntegerField(blank=True, null=True)
    split_length_seconds = models.IntegerField(blank=True, null=True)
    num_intervals = models.IntegerField(blank=True, null=True)
    distanceInt = models.IntegerField(blank=True, null=True)
    int_time_minutes = models.IntegerField(blank=True, null=True)
    int_time_sec = models.IntegerField(blank=True, null=True)
    rest_time_minutes = models.IntegerField(blank=True, null=True)
    rest_time_sec = models.IntegerField(blank=True, null=True)

class WorkoutItem(models.Model):
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='items')
    item = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    quantity = models.IntegerField()

    def __str__(self):
        return self.item


# a document model that has "title" and "description" fields
class Document(models.Model):
    title = models.CharField(max_length = 255)
    description = models.TextField()
    
    # handles the file upload and is currently using this destination directory 
    # (need to confirm correct destination directory)
    file = models.FileField(upload_to = 'documents/%Y/%m/%d')
    
    
    def __str__(self):
        return self.title