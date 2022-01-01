from django.urls import path
from .views import auth, dashboard, enroll, student, fee, faculty

urlpatterns = [
    path("auth/", auth.login),
    path("auth/faculty/", auth.faculty_login),

    path("faculty/details/", faculty.details),
    path("faculty/class/", faculty.attend_class),
    path("faculty/students/update/", faculty.update_class_student),
    path("faculty/students/<int:cl_id>/", faculty.view_class_student),
    path("faculty/students/update/all/", faculty.update_class_student_all),

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
