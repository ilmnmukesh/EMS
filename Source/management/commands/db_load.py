from json import load
from django.core.management.base import BaseCommand
from django.utils import timezone
from Source.views import loads


class Command(BaseCommand):
    help = 'Load Dummy data'

    def now(self):
        time = timezone.localtime().strftime('%X')
        self.stdout.write("It's now %s" % time)

    def handle(self, *args, **kwargs):
        self.now()
        loads()
        self.now()
