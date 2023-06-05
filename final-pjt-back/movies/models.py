from django.conf import settings
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
class Genre(models.Model):
    name = models.CharField(max_length=50)


class Actor(models.Model):
    name = models.CharField(max_length=50)
    profile_path = models.TextField(null=True)


class Movie(models.Model):
    genres = models.ManyToManyField(Genre,related_name='movies')
    title = models.CharField(max_length=100)
    overview = models.TextField()
    popularity = models.FloatField()
    poster_path = models.TextField()
    release_date = models.DateField(null=True)
    vote_average = models.FloatField()
    vote_count = models.IntegerField()
    video_key = models.TextField()
    actors = models.ManyToManyField(Actor, related_name='movies')
    

class Article(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='like_articles')
    title = models.CharField(max_length=100)
    content = models.TextField()
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    star_rating = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Comment(models.Model):
    content = models.TextField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)