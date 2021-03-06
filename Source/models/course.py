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
    NA = "NA", "Not Assign"
    SA = "SA", "Shortage of Attendance"
    RA = "RA", "ReAppear"
    B = "B", "Above Average"
    BPLUS = "B+", "Good"
    A = "A", "Very Good"
    APLUS = "A+", "Excellent"
    O = "O", "Outstanding"

    @property
    def data(self):
        return self.label, self.value


class COURSE_TYPE(models.TextChoices):
    THEORY = "Theory", "Theory"
    LAB = "Laboratory", "Lab"


class Course(MainModel):
    c_id = models.CharField(max_length=6, null=False, primary_key=True)
    c_name = models.CharField(max_length=100, null=False)
    c_qp_code = models.CharField(max_length=6)
    c_code = models.CharField(max_length=6)
    c_credits = models.IntegerField()
    c_type = models.CharField(
        max_length=15, choices=COURSE_TYPE.choices, default="Theory")
    dep_id = models.ForeignKey("Department", on_delete=models.CASCADE)


class Session(MainModel):
    value = models.CharField(max_length=100, unique=True)


class CourseFee(MainModel):
    c_id = models.OneToOneField("Course", on_delete=models.CASCADE)
    fee = models.IntegerField()


class CourseList(MainModel):
    cl_id = models.AutoField(primary_key=True)
    c_id = models.ForeignKey("Course", on_delete=models.CASCADE)
    f_id = models.ForeignKey("Faculty", on_delete=models.CASCADE)
    br_id = models.ForeignKey("Branch", on_delete=models.CASCADE)
    sems = models.CharField(max_length=1, choices=SEMS_LIST, default="1")


class StudentEnrollment(MainModel):
    std_id = models.ForeignKey("Student", on_delete=models.CASCADE)
    cl_id = models.ForeignKey("CourseList", on_delete=models.CASCADE)
    grade = models.CharField(
        max_length=30, choices=SEMS_GRADE.choices, default="NA")
    external_marks = models.IntegerField(null=True)
    internal_marks = models.IntegerField(null=True)
    attendance = models.IntegerField(null=True)
    att_1 = models.IntegerField(null=True)
    att_2 = models.IntegerField(null=True)
    att_3 = models.IntegerField(null=True)
    int_1 = models.IntegerField(null=True)
    int_2 = models.IntegerField(null=True)
    int_3 = models.IntegerField(null=True)
    regulation = models.ForeignKey("Regulation", on_delete=models.CASCADE)
    session = models.ForeignKey("Session", on_delete=models.CASCADE)

    class Meta:
        unique_together = ("std_id", "cl_id", "session")

    def check_none(self, value):
        return value if value else 0

    def to_dict_bc(self):
        data = {'std_id': int(self.std_id.rollno), 'cl_id': self.cl_id.cl_id,
                'em': self.external_marks,
                'im': self.internal_marks, 'att': self.attendance,
                'att1': self.att_1, 'att2':  self.att_2, 'att3':  self.att_3,
                'int1': self.int_1, 'int2': self.int_2, 'int3': self.int_3}

        for x in data:
            data[x] = self.check_none(data[x])

        return data
