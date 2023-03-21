from django.db import models


class Order(models.Model):
    date = models.DateField(blank=False)
    item = models.CharField(max_length=100, blank=False)
    price = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    quantity = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    amount = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    time =models.CharField(max_length=2, blank=False)
    type = models.CharField(max_length=100, blank=False)
    meters = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    timeMin = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    timeSec = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    RestMin = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    RestSec = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    reps = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    coolMeters = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    warmMeters = models.DecimalField(decimal_places=2, max_digits=10, default=0)
    def __str__(self):
        return f"{self.date}: {self.item}"

    class Meta:
        ordering = ["-id"]

