
from Source.authentication.faculty import FacultyTokenAuthentication
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.request import Request
from Source.response import ApiResponse, api_response_decorator
from Source import models, serializers

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @api_response_decorator
# def login(request: Request, response: ApiResponse):
#     pass


@api_view(["GET"])
@authentication_classes([FacultyTokenAuthentication])
@api_response_decorator
def details(request: Request, response: ApiResponse):
    response.data = serializers.FacultySerializer(instance=request.user).data
    response.success = True


@api_view(["GET"])
@authentication_classes([FacultyTokenAuthentication])
@api_response_decorator
def attend_class(request: Request, response: ApiResponse):
    query = models.CourseList.objects.filter(f_id=request.user.f_id)
    response.data = serializers.FacultySubjectSerializer(
        instance=query, many=True).data
    response.success = True


@api_view(["GET"])
@authentication_classes([FacultyTokenAuthentication])
@api_response_decorator
def view_class_student(request: Request, response: ApiResponse):
    query = models.StudentEnrollment.objects.filter(
        cl_id__f_id=request.user.f_id).order_by("std_id__rollno")
    response.data = serializers.FacultyStudentSerializer(
        instance=query, many=True).data
    response.success = True


@api_view(["POST"])
@authentication_classes([FacultyTokenAuthentication])
@api_response_decorator
def update_class_student(request: Request, response: ApiResponse):

    cl_id = request.data.get("cl_id")
    ses = request.data.get("session")
    f_id = request.user.f_id
    try:
        query = models.StudentEnrollment.objects.get(
            cl_id__f_id=f_id, cl_id=cl_id, session=ses)
    except models.StudentEnrollment.DoesNotExist:
        response.errors = "Required minimal information, session and cl_id"
        return
    ser = serializers.StudentEnrollAllSerializer(query, request.data)

    if ser.is_valid():
        ser.save()
        response.data = ser.data
        response.success = True
    else:
        response.errors = ser.errors
