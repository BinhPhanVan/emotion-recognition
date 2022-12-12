from unicodedata import name
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
from rest_framework import routers
from .views import MyModelViewSet

router = routers.DefaultRouter()
router.register(r'', MyModelViewSet,  basename='image')
urlpatterns = [
]
urlpatterns += router.urls
