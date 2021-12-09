from rest_framework.decorators import api_view
from Tables.response import ApiResponse, api_response_decorator


@api_view(["POST"])
@api_response_decorator
def login(request, response: ApiResponse):
    response.success = True
