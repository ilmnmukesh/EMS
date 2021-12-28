from .imports import MainModel, models
from django.contrib.auth.models import BaseUserManager
import binascii
import os

FACULTY_ROLE = (
    ("Teaching Follow", "Teaching Follow"),
    ("Assistant Professor", "Assistant Professor"),
    ("Professor", "Professor")
)


class Branch(MainModel):
    br_id = models.AutoField(primary_key=True)
    br_name = models.CharField(max_length=100, null=False)
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)


class FacultyManager(BaseUserManager):

    def generate_token(self):
        return binascii.hexlify(os.urandom(20)).decode()

    def create(self, **kwargs):
        kwargs["f_no"] = "FA" + str(kwargs["f_id"]).zfill(6)
        kwargs["token"] = self.generate_token()
        return super().create(**kwargs)


class Faculty(MainModel):
    f_id = models.AutoField(primary_key=True)
    f_no = models.CharField(max_length=10, unique=True)
    f_name = models.CharField(max_length=100, null=False)
    f_designation = models.CharField(
        max_length=20, choices=FACULTY_ROLE, default="Teaching Follow")
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)
    password = models.CharField(max_length=100, null=False)
    token = models.CharField(max_length=20, null=True)

    objects = FacultyManager()

    def check_password(self, pwd):
        if self.password == pwd:
            return True
        return False


class FacultyDetails(MainModel):
    fd_id = models.AutoField(primary_key=True)
    email = models.EmailField()
    contact = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    f_id = models.OneToOneField("Faculty", on_delete=models.CASCADE)


class Department(MainModel):
    dep_id = models.AutoField(primary_key=True)
    dep_name = models.CharField(max_length=100, null=False)
    dep_hod = models.CharField(max_length=100, null=False)
