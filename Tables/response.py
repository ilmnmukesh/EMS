from rest_framework.response import Response


class ApiResponse(object):
    def __init__(self, success: bool = False, data: dict = {}, description: str = "", errors: dict = {}) -> None:
        self.success: bool = success
        self.data: dict = data
        self.description: str = description
        self.errors: dict = errors

    # @property
    # def dict(self):
    #     return vars(self)


def api_response_decorator(func):
    def DjangoRest(req):
        resp = ApiResponse()
        try:
            func(req, resp)
        except Exception as e:
            resp.errors = dict(e)
            resp.description = "Something went Wrong"

        return Response(resp.__dict__)
    return DjangoRest
