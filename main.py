from PIL import Image
import requests
from io import BytesIO

response = requests.get("http://localhost:8000/media/images/bame_eIYvIYO.jpg")
img = Image.open(BytesIO(response.content))