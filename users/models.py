from django.db import models

# Create your models here.
# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class Image(models.Model):
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    class Meta:
        def __str__(self) -> str:
            return self.title