from django.shortcuts import render
import json
from .view import auth
from .view import dashboard
from Tables import models


def loads():
    with open('packages/dummies.json', "r") as s:
        dummy = json.load(s)

    def add(x, **y):
        z = getattr(models, x.title().replace(" ", "")).objects.create(**y)
        print(z)

    for x in dummy.keys():
        for y in dummy[x]:
            try:
                add(x, **y)
            except Exception as e:
                print(e)
                break
# def add(name, **val):
#     parmas = getattr(cntr.functions, "create"+name.capitalize())(**val)
#     txn = parmas.transact({"from": me, 'gas': 700000, })
#     print(txn)
