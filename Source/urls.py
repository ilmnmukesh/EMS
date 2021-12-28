from django.urls import path
from .views import auth, dashboard, enroll, student, fee

urlpatterns = [
    path("auth/", auth.login),

    path("dashboard/", dashboard.details),
    path("enroll/basic/", dashboard.basic_enrollment),
    path("branch/get/<int:did>/", dashboard.get_branch),

    path("student/details/", student.details),
    path("session/details/", dashboard.session_details),

    path("enroll/list/", enroll.course_details),
    path("enroll/add/", enroll.add_enrollment),
    path("enroll/get/", enroll.get_enrollment),

    path("fee/details/", fee.details),
]
