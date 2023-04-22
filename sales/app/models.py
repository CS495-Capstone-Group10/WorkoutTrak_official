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
    def get_by_id(self, id):
        return self.get(id=id)

    def get_or_create(self, **kwargs):
        kwargs.setdefault('id', uuid.uuid4())
        return super().get_or_create(**kwargs)
class Group(models.Model):
    # Relations
    

    # Data Fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    name = models.CharField(max_length=200, null=False, unique=True)
    description = models.CharField(max_length=200, null=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    member_count = models.FloatField(default=1, null=True)
    
    
    def __str__(self): # Create string return type for admin panel to see Group by name
        return self.name
    class Meta: # Names in admin Interface
        verbose_name = 'Group'
        verbose_name_plural = 'Groups'

class CustomUser(AbstractUser): 
    """
    Define custom user model by inheriting from AbstractUser provided from Django auth module
    Contains common fields and methods found here
    """
    #class CustomUserGroups(): Returns all to users that are in a group to avoid code in the views......
    objects = UserManager() # define your own manager class for a model
    # Relations
    group_membership = models.ManyToManyField(Group, blank=True) # Profile can be a part of many groups
    #organization = models.CharField(max_length=50, null=True, blank=True)
    # Data Fields
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    pass
    class Meta: # Names in admin Interface
        verbose_name = 'User'
        verbose_name_plural = 'User Accounts'

class Athlete(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True) # changed to true (Isaac)
    name = models.CharField(max_length=200, null=True, blank=True, default='0') # changed to true (Isaac)
    pr_length_minutes = models.IntegerField(blank=True, null=True, default=1)
    pr_length_sec = models.IntegerField(blank=True, null=True, default=1)
    lastWorkout = models.CharField(max_length=200, null=True, blank=True, default='0') # changed to true (Isaac)
    goal_length_minutes = models.IntegerField(blank=True, null=True, default=1)
    goal_length_sec = models.IntegerField(blank=True, null=True, default=1)
    TYPE_CHOICES3 = (
        ('Yes', 'Yes'),
        ('No', 'No'),
    )
    injured = models.CharField(max_length=20, choices=TYPE_CHOICES3, blank=True, null=True, default='AM')



    
class Workout(models.Model):
    
    group = models.ForeignKey(Group, blank=True, null=True, on_delete=models.DO_NOTHING) # One Group can have many workouts
    
    # Data Fields
    name = models.CharField(max_length=200, null=True, blank=True, default='0') # changed to true (Isaac)
    description = models.CharField(max_length=200, null=True, blank=True) # making null=true to bypass error in makemigrations
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    member_count = models.FloatField(default=1, null=True, blank=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True) # changed to true (Isaac)
    
    TYPE_CHOICES = (
        ('single_distance', 'Single Distance'),
        ('single_time', 'Single Time'),
        # ('intervals', 'Intervals'),
        ('Int_distance', 'Interval Distance'),
        ('Int_time', 'Interval Time'),
        ('Int_var', 'Intervals variable'),
    )
    rowingType = models.CharField(max_length=20, choices=TYPE_CHOICES,blank=True, null=True, default='single_distance')
    date = models.DateField(null=True, blank=True)
    # id = models.IntegerField(blank=True, null=False, primary_key=True)
    distance_meters = models.IntegerField(blank=True, null=True, default=1)
    time_minutes = models.IntegerField(blank=True, null=True, default=1)
    time_seconds = models.IntegerField(blank=True, null=True, default=1)
    split_length_minutes = models.IntegerField(blank=True, null=True, default=1)
    split_length_seconds = models.IntegerField(blank=True, null=True, default=1)
    num_intervals = models.IntegerField(blank=True, null=True, default=1)
    distanceInt = models.IntegerField(blank=True, null=True, default=1)
    int_time_minutes = models.IntegerField(blank=True, null=True, default=1)
    int_time_sec = models.IntegerField(blank=True, null=True, default=1)
    rest_time_minutes = models.IntegerField(blank=True, null=True, default=1)
    rest_time_sec = models.IntegerField(blank=True, null=True, default=1)
    split_length= models.IntegerField(blank=True, null=True, default=1)
    TYPE_CHOICES1 = (
        ('AT', 'AT'),
        ('SS', 'SS'),
        ('Race_pace', 'Race pace'),
    )
    workoutType = models.CharField(max_length=20, choices=TYPE_CHOICES1, blank=True, null=True, default='SS')
    # TYPE_CHOICES2 = (
    #     ('Int_distance', 'Interval Distance'),
    #     ('Int_time', 'Interval Time'),
    #     ('Int_var', 'Intervals variable'),
    # )
    # intervalVariableType = models.CharField(max_length=20, choices=TYPE_CHOICES2, blank=True, null=True)
    TYPE_CHOICES3 = (
        ('AM', 'AM'),
        ('PM', 'PM'),
    )
    workoutTime = models.CharField(max_length=20, choices=TYPE_CHOICES3, blank=True, null=True, default='AM')

    
    def __str__(self): # Create string return type for admin panel to see workout by name
        return str(self.id)

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

