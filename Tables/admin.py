from django.contrib import admin
from django.apps.registry import apps

for x in apps.get_app_config("Tables").get_models():
    admin.site.register(x)
