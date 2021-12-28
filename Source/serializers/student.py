from Source import models
from rest_framework import serializers


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = models.Student

    def to_representation(self, instance):
        data = {
            "rollno": instance.rollno,
            "std_name": instance.std_name,
            "std_dob": instance.std_dob,
            "std_addr": instance.std_addr,
            "std_email": instance.std_email,
            "std_contact": instance.std_contact,
        }
        if instance.studentrelation:
            data["dep_name"] = instance.studentrelation.dep_id.dep_name
            data["regulation"] = instance.studentrelation.reg_id.reg_value
            data["branch"] = instance.studentrelation.br_id.br_name
        return data
