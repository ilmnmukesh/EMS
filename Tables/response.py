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
    def DjangoRest(req, *args, **kwargs):
        resp = ApiResponse()
        try:
            func(req, resp, *args, **kwargs)
        except Exception as e:
            print(e)
            resp.errors = e.__dict__
            resp.description = "Something went Wrong"

        return Response(resp.__dict__)
    return DjangoRest
