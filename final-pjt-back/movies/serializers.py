from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
class MoviePosterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Movie
        fields = ('pk','title','poster_path','video_key','genres',)


class ActorSerializer(serializers.ModelSerializer):
    movies = MoviePosterSerializer(many=True, read_only=True)

    class Meta:
        model = Actor
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article','user',)


    
class ArticleListSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'user', 'username')
        read_only_fields = ('movie','user')



class ArticleSerializer(serializers.ModelSerializer):
    comment_set = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comment_set.count', read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    movie = MoviePosterSerializer(read_only=True)
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('movie','user', 'like_users', 'dislike_users',)


class MovieSerializer(serializers.ModelSerializer):
    article_set = ArticleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Movie
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    article_set = ArticleSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ('id','username','article_set','followings','followers')