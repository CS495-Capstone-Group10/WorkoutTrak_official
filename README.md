# WorkoutTrack

A web project to allow for easy access and storing of workouts for the Alabama Rowing team.

# Authors

Benjamin Derleth, Isaac Dickinson, Samantha Kellogg, Asit Singh

## Installation

##### If using windows use python instead of pip

```python
# Install the required dependencies
pip install -r requirements.txt

```

## Usage

```python

# Initialize the database models and migrate the django apps
python manage.py makemigrations
python manage.py migrate app
python manage.py migrate

# Create an admin account
python manage.py createsuperuser 

# Run the server (port number may need to be changed)
python manage.py runserver 8000
```

## Features

- Create an account with a username and password for authentication
- Create Read Update and Delete Workouts
- Create and join groups
- View athletes with a workout

## Tech Stack

- HTML
- CSS
- JavaScript
- Bootstrap
- React 
- Django 
- Django REST Framework
- SimpleJWT

## Data Analysis

```python
# To run data analysis functions run the following command from the Data folder
python data_analytics.py
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
