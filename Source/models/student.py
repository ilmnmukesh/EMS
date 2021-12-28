from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from .imports import MainModel, models
from django.utils import timezone
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class Regulation(MainModel):
    reg_id = models.BigAutoField(primary_key=True)
    reg_value = models.IntegerField()


class UserManager(BaseUserManager):

    def create_user(self, rollno, password=None, *args, **kwargs):
        if rollno is None:
            raise TypeError("Users should have rollno")

        user = self.model(rollno=rollno, password=password, *args, **kwargs)
        user.set_password(password)
        user.is_active = True
        user.save()
        return user

    def create_superuser(self, rollno, password):
        if password is None:
            raise TypeError("Password should not None")

        user = self.create_user(rollno, password)
        user.is_superuser = True
        user.is_staff = True
        user.is_active = True
        user.save()
        return user

    def create(self, **kwargs):
        return self.create_user(**kwargs)


class Student(AbstractBaseUser, PermissionsMixin):
    rollno = models.CharField(max_length=255, primary_key=True, db_index=True)

    std_name = models.CharField(max_length=100, null=False)
    std_dob = models.DateField(default=timezone.now)
    std_addr = models.TextField()
    std_email = models.EmailField()
    std_contact = models.CharField(max_length=20)

    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "rollno"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self) -> str:
        return str(self.rollno)

    @property
    def token(self):
        return self.auth_token.key


class StudentRelation(MainModel):
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)
    br_id = models.ForeignKey("Branch", on_delete=models.CASCADE)
    reg_id = models.ForeignKey("Regulation", on_delete=models.CASCADE)
    student = models.OneToOneField("Student", on_delete=models.CASCADE)


@receiver(post_save, sender=Student)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
