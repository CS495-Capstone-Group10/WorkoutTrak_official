
# currently in testing
# not complete yet
from django.db import models



# a document model that has "title" and "description" fields
class Document(models.Model):
    title = models.CharField(max_length = 255)
    description = models.TextField()
    
    # handles the file upload and is currently using this destination directory 
    # (need to confirm correct destination directory)
    file = models.FileField(upload_to = 'documents/%Y/%m/%d')
    
    
    def __str__(self):
        return self.title
    






