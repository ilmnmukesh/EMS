from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request
from Source.response import ApiResponse, api_response_decorator
from Source import models, serializers

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @api_response_decorator
# def login(request: Request, response: ApiResponse):
#	pass


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def details(request: Request, response: ApiResponse):
    ser = serializers.FeeRequirementSerializer(data=request.data)
    if ser.is_valid():
        std = request.user
        ses = ser.validated_data.get("session_id")
        br = ser.validated_data.get("br_id")
        query = models.StudentEnrollment.objects.filter(
            std_id=std, session=ses, cl_id__br_id=br)
        response.data = serializers.FeeDetailsSerializer(
            instance=query, many=True).data
    else:
        response.errors = ser.errors
