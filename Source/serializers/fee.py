from django.db.models import fields
from rest_framework import serializers
from Source import models

# class SessionSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = models.Session
# 		fields = '__all__'


class FeeDetailsSerializer(serializers.Serializer):
    class Meta:
        model = models.StudentEnrollment
        fields = '__all__'

    def to_representation(self, instance):
        course = instance.cl_id.c_id

        data = {
            "id": instance.id,
            "course_code": course.c_code,
            "course_name": course.c_name,
            "subtype": course.c_type,
            "amount": course.coursefee.fee
        }
        return data


class FeeRequirementSerializer(serializers.Serializer):
    session_id = serializers.IntegerField()
    br_id = serializers.IntegerField()
