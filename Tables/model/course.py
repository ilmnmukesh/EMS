from .imports import MainModel, models


SEMS_LIST = (
    (1, "1"),
    (2, "2"),
    (3, "3"),
    (4, "4"),
    (5, "5"),
    (6, "6"),
    (7, "7"),
    (8, "8"),
)


class SEMS_GRADE(models.TextChoices):
    NA = "Not Assign", "NA"
    SA = "Shortage of Attendance", "SA"
    RA = "ReAppear", "RA"
    B = "Above Average", "B"
    BPLUS = "Good", "B+"
    A = "Very Good", "A"
    APLUS = "Excellet", "A+"
    O = "Outstanding",  "O"

    @property
    def data(self):
        return self.label, self.value


class Course(MainModel):
    c_id = models.CharField(max_length=6, null=False, primary_key=True)
    c_name = models.CharField(max_length=100, null=False)
    c_qp_code = models.CharField(max_length=6)
    c_credits = models.IntegerField()
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)


class CourseList(MainModel):
    cl_id = models.AutoField(primary_key=True)
    c_id = models.ForeignKey("Course", on_delete=models.CASCADE)
    f_id = models.ForeignKey("Faculty", on_delete=models.CASCADE)
    sems = models.CharField(max_length=1, choices=SEMS_LIST, default="1")


class StudentEnrollment(MainModel):
    std_id = models.ForeignKey("Student", on_delete=models.CASCADE)
    cl_id = models.ForeignKey("CourseList", on_delete=models.CASCADE)
    grade = models.CharField(
        max_length=30, choices=SEMS_GRADE.choices, default="NA")
    external_marks = models.IntegerField()
    internal_marks = models.IntegerField()
    attendance = models.IntegerField()
    att_1 = models.IntegerField()
    att_2 = models.IntegerField()
    att_3 = models.IntegerField()
    int_1 = models.IntegerField()
    int_2 = models.IntegerField()
    int_3 = models.IntegerField()
