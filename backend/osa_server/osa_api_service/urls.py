from django.urls import path
from . import views

urlpatterns = [
    path('start', views.start, name='start'),
    path('cmd/<str:command>', views.cmd, name='cmd')
]
