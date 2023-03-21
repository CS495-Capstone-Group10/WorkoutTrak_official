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



# a document model that has "title" and "description" fields
class Document(models.Model):
    title = models.CharField(max_length = 255)
    description = models.TextField()
    
    # handles the file upload and is currently using this destination directory 
    # (need to confirm correct destination directory)
    file = models.FileField(upload_to = 'documents/%Y/%m/%d')
    
    
    def __str__(self):
        return self.title