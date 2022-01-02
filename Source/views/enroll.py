from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request
from Source.response import ApiResponse, api_response_decorator
from Source import models, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.validators import ValidationError
from EMS.settings import ENABLE_BC


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def course_details(request: Request, response: ApiResponse):
    ser = serializers.GetCourseSerializer(data=request.data)
    if ser.is_valid():
        sem = ser.validated_data.get("semester")
        dep_id = ser.validated_data.get("dep_id")
        br_id = ser.validated_data.get("br_id")
        query = models.CourseList.objects.filter(
            c_id__dep_id=dep_id, sems=sem, br_id=br_id)
        response.data = serializers.CourseListSerializer(
            instance=query, many=True).data
        response.success = True
    else:
        response.errors = ser.errors


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def add_enrollment(request: Request, response: ApiResponse):
    ser = serializers.StudentEnrollSerializer(data=request.data, many=True)
    if ser.is_valid():
        obj = ser.save()
        if ENABLE_BC:
            from packages.blockchain import addEnrollment
            for x in obj:
                temp = x.to_dict_bc()
                py = addEnrollment(temp["std_id"], temp["cl_id"])
                print(py)

        response.data = ser.data
        response.success = True
    else:
        response.errors = ser.errors


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def get_enrollment(request: Request, response: ApiResponse):
    ses = request.query_params.get("ses", None)
    if ses == None:
        raise ValidationError("required session value")
    query = models.StudentEnrollment.objects.filter(
        std_id=request.user.rollno, session=ses)
    response.data = serializers.StudentEnrollAllSerializer(
        instance=query, many=True).data
    response.success = True
