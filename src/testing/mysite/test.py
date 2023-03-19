import requests 
import json

URL = "http://127.0.0.1:8000/men/"

data = {
    "name":"T-shirt",
    "price":300,
    "size":"L",
    "color":"white"
}

response = requests.get(url=URL, json=data)

print(response.text)