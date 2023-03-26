from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

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
    
class UserManager(BaseUserManager):

    use_in_migration = True

    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('username is Required')
        if not password:
            raise ValueError('Password is required')
        
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff = True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser = True')

        return self.create_user(username, password, **extra_fields)
    
class CustomUser(AbstractUser): 
    """
    Define custom user model by inheriting from AbstractUser provided from Django auth module
    Contains common fields and methods found here
    """
    objects = UserManager() # define your own manager class for a model
    pass
    class Meta: #Names in admin Interface
        verbose_name = 'User'
        verbose_name_plural = 'Users'

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    bio = models.TextField()
    location = models.CharField(max_length=100)


