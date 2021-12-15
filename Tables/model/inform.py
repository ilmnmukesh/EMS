from .imports import MainModel, models


class Instruction(MainModel):
    title = models.CharField(max_length=100)


class InstructionPoint(MainModel):
    content = models.TextField()
    instruction = models.ForeignKey("Instruction", on_delete=models.CASCADE)


class Circular(MainModel):
    description = models.CharField(max_length=100)
    download = models.CharField(max_length=255)
    link = models.URLField()
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
