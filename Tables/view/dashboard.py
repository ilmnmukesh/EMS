from rest_framework.decorators import api_view
from rest_framework.request import Request
from Tables.response import ApiResponse, api_response_decorator
from Tables import models
from Tables.serializers import InstructionSerializer, CircularSerializer


@api_view(["GET"])
@api_response_decorator
def details(request: Request, response: ApiResponse):
    response.success = True
    response.data["instructions"] = InstructionSerializer(
        instance=models.Instruction.objects.all(), many=True).data
    response.data["circular"] = CircularSerializer(
        instance=models.Circular.objects.order_by("-created")[:10], many=True).data
