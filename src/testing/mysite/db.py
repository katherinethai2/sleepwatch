obj = {
    "name": "t-shirt",
    "price": 9000,
    "size": "XL",
    "color": "Black"
}

import json

def readDB(filename="db.json"):
    with open(filename, mode="r") as jsonFile:
        data = json.load(jsonFile)

    return data

def writeDB(obj, filename="db.json"):
    with open(filename, mode="r") as jsonFile:
        data = json.load(jsonFile)
        temp = data["database"]['men']
        temp.append(obj)

    with open(filename, mode="w") as jsonFile:
        json.dump(data, jsonFile)

#writeDB(obj = obj)

data = readDB() 
print(data)