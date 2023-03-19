from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
import torch
import itertools
import traceback

def sleep(Request):
    return HttpResponse("Welcome to SleepWatch's Server")

__model__ = None

__feature_neams__ = ['TotalSteps', 'TotalDistance', 'TrackerDistance', 'LoggedActivitiesDistance', 'VeryActiveDistance', 'ModeratelyActiveDistance', 'LightActiveDistance', 'SedentaryActiveDistance', 'VeryActiveMinutes', 'FairlyActiveMinutes', 'LightlyActiveMinutes', 'SedentaryMinutes', 'Calories', 'StepTotal']

__spot_feature__ = None
__spot_names__ = None

@csrf_exempt
def dataRequests(request):
    if request.method == "GET":
        data = []

        with open("db.json", mode="r") as jsonFile:
            data = json.load(jsonFile)

        return JsonResponse({"return": data})

    elif request.method == "POST":
        try:
            print("data recieved")

            request = json.loads(bytes.decode(request.body))
            contexts = request if isinstance(request[0], list) else [request, ]
            print(contexts)
            feature_num = 5
            spot_num = 3
            
            assert isinstance(contexts, list), 'Expect contexts to be a list'
            assert all(isinstance(ctx, list) and len(ctx) == 14 for ctx in contexts), f'Expect all list in contexts has 14 features: {contexts}'

            global __model__, __spot_feature__, __spot_names__, __feature_neams__
            if __model__ is None:
                __model__ = torch.load('daily_model.pth')
            if __spot_feature__ is None:
                with open('spot.json') as f:
                    spot = json.load(f)
                __spot_feature__ = torch.tensor(list(spot.values())).float()
                __spot_names__ = list(spot.keys())

            results = []
            for context in contexts:
                x = torch.tensor(context, requires_grad=True)[None, :]
                y = __model__['pred_model'](__model__['auto_encoder'](x))

                g, = torch.autograd.grad(y, x)  # dy/dx
                g.squeeze_()

                s = __spot_feature__ @ g

                results.append({
                    'features': [{'feature': __feature_neams__[i], 'increase': bool(g[i] > 0), 'sorce': abs(g[i].item()), 'grad': g[i].item()} for i in itertools.islice(torch.argsort(g, descending=True), feature_num)],
                    'spots': [{'spot': __spot_names__[i], 'sorce': s[i].item()} for i in itertools.islice(torch.argsort(s, descending=True), spot_num)]
                })

            with open("db.json", mode="w") as jsonFile:
                json.dump(results, jsonFile)

            return JsonResponse({"request":"done!"})

        except Exception as e:
            return JsonResponse({
                'error': str(e),
                'traceback': traceback.format_exc()
            })