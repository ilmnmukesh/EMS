from rest_framework.decorators import api_view
from rest_framework.request import Request
from Source.response import ApiResponse, api_response_decorator
from Source import models


@api_view(["GET"])
@api_response_decorator
def details(request: Request, response: ApiResponse):
    response.data = models.Student.objects.get(pk=request.user.id)
    response.success = True
