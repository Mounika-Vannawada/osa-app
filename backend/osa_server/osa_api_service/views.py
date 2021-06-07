from django.http.response import HttpResponse
from django.shortcuts import render
import requests
import json
from datetime import datetime, timezone

url_path = "http://flaskosa.herokuapp.com/cmd/"

"""
Input: Date in String format
Output: Date in ISO 8601 fromat in UTC
Function: Converts data in string format to
iso format in UTC timezone
"""
def utc_iso_format(date):
    date_time = datetime.strptime(date, "%y.%m.%d %H:%M:%S") 
    return date_time.replace(tzinfo=timezone.utc).isoformat()

"""
Input: url request
Output: OSA trace data for continuous acquisition
Function: Retrieves data through api calls and sends
the data essentail to display the graph
"""
def start(request):
    context = {}
    x_val_range = []
    while True:
        try:
            req = requests.get(url_path + "START", timeout=1) # makes get request
            if req.status_code == 200:
                break
        except requests.exceptions.Timeout:
            continue
        except requests.exceptions.ConnectionError:
            continue

    while True:
        try:
            reqst = requests.get(url_path + "LIM", timeout=1) # makes get request
            if reqst.status_code == 200:
                x_val_range = reqst.text
                break
        except requests.exceptions.Timeout:
            continue
        except requests.exceptions.ConnectionError:
            continue

    while True:
        try:
            req1 = requests.get(url_path + "TRACE", timeout=1) # makes get request
            if req1.status_code == 200:
                data = req1.json()
                if isinstance(data, dict):
                    x_increment = data["xincrement"]
                    y_values_count = len(data['ydata'])
                    xValues = []
                    x_val = x_val_range.replace('+READY>[', '').split(',')[0]
                    for i in range(y_values_count):
                        xValues.append(float(x_val) + i*x_increment)
                    context = {"xValues": xValues,
                        "yValues": data['ydata'], 
                        "timestamp": utc_iso_format(data['timestamp'])}
                    return HttpResponse(json.dumps(context))
                else:
                    continue
            else: 
                continue
        except requests.exceptions.Timeout:
            continue

"""
Input: url request
param: command to run
Output: OSA commands response
"""
def cmd(request, command):
    url = url_path + command
    print("Command:", url)
    while True:
        try:
            req = requests.get(url, timeout=1) # makes get request
            context = {'status': req.status_code,
              'text': req.text}
            return HttpResponse(json.dumps(context))
        except requests.exceptions.Timeout:
            continue
        except requests.exceptions.ConnectionError:
            continue

