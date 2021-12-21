from django.urls import path
from .views import auth, dashboard, enroll

urlpatterns = [
    path("auth/", auth.login),

    path("dashboard/", dashboard.details),
    path("enroll/basic/", dashboard.basic_enrollment),
    path("branch/get/<int:did>/", dashboard.get_branch),

    path("enroll/list/", enroll.course_details),
    path("enroll/add/", enroll.add_enrollment),
    path("enroll/get/", enroll.get_enrollment),
]
