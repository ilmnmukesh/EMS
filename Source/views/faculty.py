
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
def view_class_student(request: Request, response: ApiResponse, cl_id):
    query = models.StudentEnrollment.objects.filter(
        cl_id__f_id=request.user.f_id, cl_id=cl_id).order_by("std_id__rollno")
    response.data = serializers.FacultyStudentSerializer(
        instance=query, many=True).data
    response.success = True


@api_view(["POST"])
@authentication_classes([FacultyTokenAuthentication])
@api_response_decorator
def update_class_student(request: Request, response: ApiResponse):
    ser = serializers.FacultyStudentUpdateSerializer(data=request.data)
    if ser.is_valid():
        cl_id = ser.validated_data.get("cl_id")
        ses = ser.validated_data.get("session")
        std_id = ser.validated_data.get("std_id")
        f_id = request.user.f_id
        query = models.StudentEnrollment.objects.get(
            cl_id__f_id=f_id, cl_id=cl_id, std_id=std_id, session=ses)
        ser = serializers.StudentEnrollAllSerializer(query, request.data)
        if ser.is_valid():
            ser.save()
            response.data = ser.data
            response.success = True
        else:
            response.errors = ser.errors
    else:
        response.errors = ser.errors


@api_view(["POST"])
@authentication_classes([FacultyTokenAuthentication])
@api_response_decorator
def update_class_student_all(request: Request, response: ApiResponse):
    response.errors = []
    response.data = []
    for data in request.data:
        ser = serializers.FacultyStudentUpdateSerializer(data=data)
        if ser.is_valid():
            cl_id = ser.validated_data.get("cl_id")
            ses = ser.validated_data.get("session")
            std_id = ser.validated_data.get("std_id")
            f_id = request.user.f_id
            try:
                query = models.StudentEnrollment.objects.get(
                    cl_id__f_id=f_id, cl_id=cl_id, std_id=std_id, session=ses)
                ser = serializers.StudentEnrollAllSerializer(query, data)
                if ser.is_valid():
                    ser.save()
                    response.data.append(ser.data)
                else:
                    response.errors.append(ser.errors)
            except models.StudentEnrollment.DoesNotExist:
                response.errors.append(str(data) + " does not exits in enroll")
        else:
            response.errors.append(ser.errors)
    response.success = True
