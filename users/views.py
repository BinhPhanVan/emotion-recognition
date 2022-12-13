from django.shortcuts import render

from identified import recognize_image

# Create your views here.
from .models import Image
from .serializers import MyModelSerializer
from rest_framework import permissions, viewsets
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from rest_framework.response import Response
import cv2
import numpy as np
from keras.models import model_from_json
from django.core.files.base import ContentFile
import uuid
from io import BytesIO

import random
import string

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str


class MyModelViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    serializer_class = MyModelSerializer
    parser_classes = (MultiPartParser, FormParser)
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        print(request.data)
        if serializer.is_valid(raise_exception=True):
            self.perform_create(serializer)
            image = recognize_image(serializer.data['image_url'])
            filename = get_random_string(8)
            cv2.imwrite('../mediafiles/images/{}.jpg'.format(filename), image)
            image = Image.objects.create(image_url='images/{}.jpg'.format(filename))
            serializer = self.get_serializer(image)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST, headers=headers)
    def retrieve(self, request, *args, **kwargs):
        return Response({"aaaa": "aaaa"},status=status.HTTP_200_OK)
