import json
from Source import models
from rest_framework.authtoken.models import Token


def loads():
    with open('packages/dummies.json', "r") as s:
        dummy = json.load(s)

    def add(x, **y):
        z = getattr(models, x.title().replace(" ", "")).objects.create(**y)
        print(z)

    def create_su():
        try:
            su = models.Student(rollno="mukesh")
            su.set_password("1")
            su.is_active = True
            su.is_superuser = True
            su.is_staff = True
            su.save()
            print(su)
        except:
            print("Super User already exists")
    for x in dummy.keys():
        for y in dummy[x]:
            try:
                add(x, **y)
            except Exception as e:
                print(e)
                break

    create_su()
    us = models.Student.objects.get(rollno="2019202034")
    print(us)
    Token.objects.filter(user=us).update(
        key="62ca3626b3291d374be9befb29a2c841db2751b5")
    models.Faculty.objects.filter(f_no="FA000001").update(
        token="a27e951a41e165b3acd3b1426092d8bb03bd0d7e")
