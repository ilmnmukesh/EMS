from rest_framework import authentication
from rest_framework import exceptions, HTTP_HEADER_ENCODING


class FacultyTokenAuthentication(authentication.BaseAuthentication):
    model = None

    def get_token(self, request):
        auth = request.META.get('HTTP_AUTHORIZATION', b'')
        if isinstance(auth, str):
            auth = auth.encode(HTTP_HEADER_ENCODING)
        return auth

    def get_model(self):
        if self.model is not None:
            return self.model
        from Source.models import Faculty
        return Faculty

    def authenticate(self, request):
        auth = self.get_token(request).split()

        if not auth or auth[0].lower() != b"token":
            raise exceptions.NotAuthenticated(
                "Authentication credentials were not provided.")

        if len(auth) == 1:
            raise exceptions.AuthenticationFailed(
                'Invalid token header. No credentials provided.')
        elif len(auth) > 2:
            raise exceptions.AuthenticationFailed(
                'Invalid token header. Token string should not contain spaces.')

        try:
            token = auth[1].decode()
        except UnicodeError:
            raise exceptions.AuthenticationFailed(
                'Invalid token header. Token string should not contain invalid characters.')

        return self.authenticate_token(token)

    def authenticate_token(self, token):
        model = self.get_model()
        try:
            token = model.objects.get(token=token)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token.')

        return (token, token)
