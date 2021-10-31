from .imports import MainModel, models
from django.utils import timezone


class Regulation(MainModel):
    reg_id = models.BigAutoField(primary_key=True)
    reg_value = models.IntegerField()


class Student(MainModel):
    std_id = models.BigAutoField(primary_key=True)
    std_name = models.CharField(max_length=100, null=False)
    std_dob = models.DateField(default=timezone.now())
    std_addr = models.TextField()
    std_email = models.EmailField()
    std_contact = models.CharField(max_length=20)
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)
    br_id = models.ForeignKey("Branch", on_delete=models.CASCADE)
    regulation = models.ForeignKey("Regulation", on_delete=models.CASCADE)
