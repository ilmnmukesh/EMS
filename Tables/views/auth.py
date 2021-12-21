from rest_framework.decorators import api_view
from rest_framework.request import Request
from Tables.response import ApiResponse, api_response_decorator
from Tables import models


@api_view(["POST"])
@api_response_decorator
def login(request: Request, response: ApiResponse):
    rollno = request.data.get("rollno", None)
    pwd = request.data.get("password", None)
    response.data
    if rollno == None:
        response.errors["rollno"] = "This field is required"
    if pwd == None:
        response.errors["password"] = "This field is required"
    if rollno == None or pwd == None:
        return
    obj = models.Student.objects.filter(pk=rollno)
    if obj.exists():
        if obj.first().check_password(pwd):
            response.data = {
                "token": obj.first().token,
                "valid": True
            }
        else:
            response.errors = {"password": "Password Missmatch"}
            return
    else:
        response.errors = {"rollno": "Invalid user's"}
        return
    response.success = True
