from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request
from Tables.response import ApiResponse, api_response_decorator
from Tables import models, serializers
from rest_framework.permissions import IsAuthenticated


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def details(request: Request, response: ApiResponse):
    response.success = True
    response.data["instructions"] = serializers.InstructionSerializer(
        instance=models.Instruction.objects.all(), many=True).data
    response.data["circular"] = serializers.CircularSerializer(
        instance=models.Circular.objects.order_by("-created")[:10], many=True).data


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def basic_enrollment(request: Request, response: ApiResponse):
    response.success = True
    query = models.Session.objects.all()
    response.data["session"] = serializers.SessionSerializer(
        instance=query, many=True).data
    query = models.Department.objects.all()
    response.data["department"] = serializers.DepartmentSerializer(
        instance=query, many=True).data


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@api_response_decorator
def get_branch(request: Request, response: ApiResponse, did):
    response.success = True
    query = models.Branch.objects.filter(dep_id=did)
    response.data = serializers.BranchSerializer(
        instance=query, many=True).data
