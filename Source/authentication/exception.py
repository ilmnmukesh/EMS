from rest_framework.response import Response
from Source.response import ApiResponse


def handler(exc, context):
    res = ApiResponse(False, {}, "", {})
    res.errors = res.description = str(exc)

    return Response(res.__dict__, status=401)
