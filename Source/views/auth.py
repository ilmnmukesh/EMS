from rest_framework.decorators import api_view
from rest_framework.request import Request
from Source.response import ApiResponse, api_response_decorator
from Source import models
from EMS.settings import ENABLE_BC


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
    if ENABLE_BC:
        from packages.blockchain import login
        data = login(int(rollno))
        print(data)
        if data["password"] == pwd:
            response.data = {
                "token": obj.first().token,
                "valid": True
            }
        else:
            response.errors = {"password": "Password Missmatch"}
            return
    else:
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


@api_view(["POST"])
@api_response_decorator
def faculty_login(request: Request, response: ApiResponse):
    faculty_no = request.data.get("faculty_no", None)
    pwd = request.data.get("password", None)
    response.data
    if faculty_no == None:
        response.errors["faculty_no"] = "This field is required"
    if pwd == None:
        response.errors["password"] = "This field is required"
    if faculty_no == None or pwd == None:
        return
    obj = models.Faculty.objects.filter(f_no=faculty_no)
    if obj.exists():
        if obj.first().check_password(pwd):
            response.data = {
                "token": obj.first().token,
                "valid": True,
            }
        else:
            response.errors = {"password": "Password Missmatch"}
            return
    else:
        response.errors = {"rollno": "Invalid user's"}
        return
    response.success = True
