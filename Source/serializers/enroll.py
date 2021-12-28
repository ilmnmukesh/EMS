from Source import models
from rest_framework import serializers


class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Session
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Department
        fields = "__all__"


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Branch
        fields = "__all__"


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Course
        fields = "__all__"


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Faculty
        fields = "__all__"


class CourseListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseList
        fields = "__all__"

    def to_representation(self, instance):
        course = CourseSerializer(instance=instance.c_id).data
        faculty = FacultySerializer(instance=instance.f_id).data
        dep = DepartmentSerializer(instance=instance.c_id.dep_id).data
        data = {
            "id": instance.cl_id,
            "sems": instance.sems,
            **course,
            **faculty,
            **dep
        }
        return data


class StudentEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentEnrollment
        fields = ["std_id", "cl_id", "regulation", "session"]

    def to_representation(self, instance):
        default = super().to_representation(instance)
        course = CourseListSerializer(instance=instance.cl_id).data
        return {**default, **course}


class StudentEnrollAllSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentEnrollment
        fields = "__all__"

    def to_representation(self, instance):
        default = super().to_representation(instance)
        course = CourseListSerializer(instance=instance.cl_id).data
        return {**default, **course}


class GetCourseSerializer(serializers.Serializer):
    semester = serializers.IntegerField()
    dep_id = serializers.IntegerField()
    br_id = serializers.IntegerField()
