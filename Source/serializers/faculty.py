
from rest_framework import serializers
from Source import models

# class SessionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Session
#         fields = '__all__'


class FacultyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FacultyDetails
        fields = "__all__"


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Faculty
        fields = '__all__'

    def to_representation(self, instance):
        other = {}
        if hasattr(instance, "facultydetails"):
            other = FacultyDetailsSerializer(
                instance=instance.facultydetails).data
        data = {
            "f_no": instance.f_no,
            "f_name": instance.f_name,
            "f_designation": instance.f_designation,
            "dep_name": instance.dep_id.dep_name,
            **other
        }
        return data


class FacultySubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.CourseList
        fields = '__all__'

    def to_representation(self, instance):
        cnt = models.StudentEnrollment.objects.filter(
            cl_id=instance.pk).count()
        data = {
            "cl_id": instance.pk,
            "course_name": instance.c_id.c_name,
            "sems": instance.sems,
            "dep_name": instance.br_id.dep_id.dep_name,
            "br_name": instance.br_id.br_name,
            "std_cnt": cnt
        }
        return data


class FacultyStudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.StudentEnrollment
        fields = "__all__"

    def to_representation(self, instance):
        super_data = super().to_representation(instance)
        del super_data["std_id"]
        data = {
            "id": instance.id,
            "std_id": instance.std_id.rollno,
            "sems": instance.cl_id.sems,
            "std_name": instance.std_id.std_name,
            **super_data
        }
        return data


class FacultyStudentUpdateSerializer(serializers.Serializer):
    cl_id = serializers.IntegerField()
    session = serializers.IntegerField()
    std_id = serializers.IntegerField()
