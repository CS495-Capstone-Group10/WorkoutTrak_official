#from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid

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


<<<<<<< HEAD
class Workout(models.Model):
    TYPE_CHOICES = (
        ('single_distance', 'Single Distance'),
        ('single_time', 'Single Time'),
        ('intervals', 'Intervals'),
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    date = models.DateField()
    #id = models.IntegerField(blank=True, null=False, primary_key=True)
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
    def __str__(self):
        return f"{self.type} - {self.date}"
=======
# class Workout(models.Model):
#     TYPE_CHOICES = (
#         ('single_distance', 'Single Distance'),
#         ('single_time', 'Single Time'),
#         ('intervals', 'Intervals'),
#     )
#     type = models.CharField(max_length=20, choices=TYPE_CHOICES)
#     date = models.DateField()
#     id = models.IntegerField(blank=True, null=False, primary_key=True)
#     distance_meters = models.IntegerField(blank=True, null=True)
#     time_minutes = models.IntegerField(blank=True, null=True)
#     time_seconds = models.IntegerField(blank=True, null=True)
#     split_length_minutes = models.IntegerField(blank=True, null=True)
#     split_length_seconds = models.IntegerField(blank=True, null=True)
#     num_intervals = models.IntegerField(blank=True, null=True)
#     distanceInt = models.IntegerField(blank=True, null=True)
#     int_time_minutes = models.IntegerField(blank=True, null=True)
#     int_time_sec = models.IntegerField(blank=True, null=True)
#     rest_time_minutes = models.IntegerField(blank=True, null=True)
#     rest_time_sec = models.IntegerField(blank=True, null=True)
>>>>>>> 89f5375b2cacd56866ae5941296691a995ca5730



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
            raise ValueError('Username is Required')
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
    
class Group(models.Model):
    # Relations
    

    # Data Fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, null=False)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    member_count = models.FloatField(default=1, null=True)
    
    def __str__(self): # Create string return type for admin panel to see Group by name
        return self.name

class CustomUser(AbstractUser): 
    """
    Define custom user model by inheriting from AbstractUser provided from Django auth module
    Contains common fields and methods found here
    """
    objects = UserManager() # define your own manager class for a model
    
    # Relations
    group_membership = models.ManyToManyField(Group, blank=True) # Profile can be a part of many groups
    organization = models.CharField(max_length=50, null=True, blank=True)
    # Data Fields
    
    pass
    class Meta: #Names in admin Interface
        verbose_name = 'User'
        verbose_name_plural = 'Users'





    
class Workout(models.Model):
    
    group = models.ForeignKey(Group, blank=True, null=True, on_delete=models.DO_NOTHING) # One Group can have many workouts
    
    # Data Fields
    name = models.CharField(max_length=200, null=True) # changed to true (Isaac)
    description = models.CharField(max_length=200, null=True) # making null=true to bypass error in makemigrations
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    member_count = models.FloatField(default=1, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False) # changed to true (Isaac)
    
    TYPE_CHOICES = (
        ('single_distance', 'Single Distance'),
        ('single_time', 'Single Time'),
        ('intervals', 'Intervals'),
    )
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    #date = models.DateField()
    # id = models.IntegerField(blank=True, null=False, primary_key=True)
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
    
    def __str__(self): # Create string return type for admin panel to see workout by name
        return self.name

# class Profile(models.Model):
#     # Relations
#     account = models.OneToOneField(CustomUser, on_delete=models.CASCADE) # Profile has 1 account
#     group_membership = models.ManyToManyField(Group, blank=True) # Profile can be a part of many groups
    
#     # Data Fields
#     profile_name = models.CharField(max_length=200, null=False, unique=True)
#     name = models.CharField(max_length=200, null=True, blank=True)
#     email = models.CharField(max_length=200, null=True, blank=True)
#     phone = models.CharField(max_length=200, null=True, blank=True)
#     date_created = models.DateTimeField(auto_now_add=True, null=True)

#     def __str__(self): # Create string return type for admin panel to see accounts by email
#         return self.account.username


    
# Old Code from Isaac 2.2
# class CustomUserManager(BaseUserManager):
#     def create_user(self, email, password=None, **extra_fields):
#         if not email:
#             raise ValueError('Users must have an email address')
#         user = self.model(email=self.normalize_email(email), **extra_fields)
#         user.set_password(password)
#         user.save(using=self._db)
#         return user
    
#     def create_superuser(self,email,password=None, **extra_fields):
#         extra_fields.setdefault('is_staff', True)
#         extra_fields.setdefault('is_superuser', True)
#         return self.create_user(email, password, **extra_fields)

# class CustomUser(AbstractBaseUser, PermissionsMixin):
#     email = models.EmailField(unique=True)
#     first_name = models.CharField(max_length=30, blank=True)
#     last_name = models.CharField(max_length=30, blank=True)
#     is_active = models.BooleanField(default=True)
#     is_active = models.BooleanField(default=False)
#     date_joined = models.DateTimeField(auto_now_add=True)
#     #updated_at = models.DateTimeField(auto_now=True)
    
#     objects=CustomUserManager()
    
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name']
    
#     def __str__(self):
#         return self.email
    
#     def get_full_name(self):
#         full_name = '%s %s' % (self.first_name, self.last_name)
#         return full_name.strip()
    
#     def get_short_name(self):
#         return self.first_name

