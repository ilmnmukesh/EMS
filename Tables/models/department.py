from .imports import MainModel, models

FACULTY_ROLE = (
    ("Teaching Follow", "Teaching Follow"),
    ("Assistant Professor", "Assistant Professor"),
    ("Professor", "Professor")
)


class Branch(MainModel):
    br_id = models.AutoField(primary_key=True)
    br_name = models.CharField(max_length=100, null=False)
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)


class Faculty(MainModel):
    f_id = models.AutoField(primary_key=True)
    f_name = models.CharField(max_length=100, null=False)
    f_designation = models.CharField(
        max_length=20, choices=FACULTY_ROLE, default="Teaching Follow")
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)


class Department(MainModel):
    dep_id = models.AutoField(primary_key=True)
    dep_name = models.CharField(max_length=100, null=False)
    dep_hod = models.CharField(max_length=100, null=False)
