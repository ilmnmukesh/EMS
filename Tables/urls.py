from django.urls import path
from .views import auth, dashboard

urlpatterns = [
    path("auth/", auth.login),
    path("dashboard/", dashboard.details),
]
