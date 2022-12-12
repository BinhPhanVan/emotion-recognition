from rest_framework import serializers
from .models import Image

class MyModelSerializer(serializers.ModelSerializer):
    image_url = serializers.ImageField()
    class Meta:
        model = Image
        fields = ['image_url']