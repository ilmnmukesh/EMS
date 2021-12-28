from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request
from Source.response import ApiResponse, api_response_decorator
from Source import models, serializers


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def details(request: Request, response: ApiResponse):
    response.data = serializers.StudentSerializer(instance=request.user).data
    response.success = True
