from django.http import JsonResponse
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.shortcuts import get_object_or_404, get_list_or_404, render
from django.contrib.auth import get_user_model
# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


from random import sample

User = get_user_model()
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_detail(request,movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieSerializer(movie)
    return Response(serializer.data)


@api_view(['GET'])
def actor_detail(request, actor_pk):
    if request.method == 'GET':
        actor = get_object_or_404(Actor, pk=actor_pk)
        serializer = ActorSerializer(actor)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def worldcup(request):
    movies = get_list_or_404(Movie)
    random_movies = sample(movies,16)
    serializer = MoviePosterSerializer(random_movies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def article_create(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, user=request.user)
        return Response(serializer.data)
    

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def article_detail(request, movie_pk, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'GET':
        serializer = ArticleSerializer(article)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
    elif request.method == 'DELETE':
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def comment(request, article_pk, comment_pk):
    comment = get_object_or_404(Comment, pk=comment_pk, article=article_pk)
    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def comment_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(article=article, user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def article_like(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if article.like_users.filter(pk=request.user.pk).exists():
        article.like_users.remove(request.user)
    else:
        article.like_users.add(request.user)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = get_object_or_404(User, username=request.user)
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_another(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)
    serializer = UserProfileSerializer(user)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow(request, user_pk):
    user = get_object_or_404(User, pk=user_pk)
    if user.followers.filter(pk=request.user.pk).exists():
        user.followers.remove(request.user)
    else:
        user.followers.add(request.user)
    return Response(status=status.HTTP_200_OK)
