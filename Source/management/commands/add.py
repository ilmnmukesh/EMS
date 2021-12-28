from pathlib import Path
from django.core.management.base import BaseCommand

BASE_DIR = Path(__file__).parent.parent.parent
SERIALIZERS = """
from rest_framework import serializers
from %s import models

# class SessionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = models.Session
#         fields = '__all__'
        
"""
VIEWS = """
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.request import Request
from %s.response import ApiResponse, api_response_decorator
from %s import models

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @api_response_decorator
# def login(request: Request, response: ApiResponse):
#     pass

"""


class Command(BaseCommand):
    help = 'Load Dummy data'

    def add_arguments(self, parser):
        parser.add_argument('-f', '--file', type=str,
                            help='Add File to models, serializers, views')
        parser.add_argument('-sv', '--ser_view', type=str,
                            help='Add File to serializers, views')

    def add_file(self, add_for, filename):
        file_path = BASE_DIR / add_for / str(filename + ".py")
        parent_dir = BASE_DIR.name
        try:
            with open(file_path, 'x') as fp:
                pass

            if add_for == "serializers":
                with open(file_path, "w") as fp:
                    fp.write(SERIALIZERS % parent_dir)
            elif add_for == "views":
                with open(file_path, "w") as fp:
                    fp.write(VIEWS % (parent_dir, parent_dir))

            self.stdout.write('File add in "'+str(file_path)+'"')
        except:
            self.stdout.write('File already exists in '+add_for)

    def handle(self, *args, **kwargs):
        files = kwargs["file"]
        ser_view = kwargs["ser_view"]
        if files:
            self.add_file("models", files)
            self.add_file("views", files)
            self.add_file("serializers", files)
        elif ser_view:
            self.add_file("views", ser_view)
            self.add_file("serializers", ser_view)
        else:
            self.stdout.write('Required Arguments')
