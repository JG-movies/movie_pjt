from django.urls import path
from . import views

urlpatterns = [
    path('movie/<int:movie_pk>/',views.movie_detail),
    path('actor/<int:actor_pk>/', views.actor_detail),
    path('worldcup/', views.worldcup),
    path('movie/<int:movie_pk>/article/create/', views.article_create),
    path('movie/<int:movie_pk>/article/<int:article_pk>/', views.article_detail),
    path('article/<int:article_pk>/comment/<int:comment_pk>/', views.comment),
    path('article/<int:article_pk>/comment/', views.comment_create),
    path('article/<int:article_pk>/like/', views.article_like),
    path('profile/', views.profile),
    path('profile/<int:user_pk>/', views.profile_another),
    path('follow/<int:user_pk>/', views.follow),
]
