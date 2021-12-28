from rest_framework import serializers
from Source.models import Instruction, InstructionPoint, Circular, Session


class InstructionPointSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = InstructionPoint


class InstructionSerializer(serializers.ModelSerializer):
    contents = InstructionPointSerializer(many=True)

    class Meta:
        model = Instruction
        fields = "__all__"

    def to_representation(self, instance):
        data = instance.to_dict()
        data["contents"] = []

        for content in instance.instructionpoint_set.all():
            data["contents"].append(
                InstructionPointSerializer(instance=content).data)

        return data


class CircularSerializer(serializers.ModelSerializer):
    class Meta:
        model = Circular
        fields = "__all__"
