# Generated by Django 3.2 on 2021-12-21 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tables', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='studentenrollment',
            name='att_1',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='att_2',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='att_3',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='attendance',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='external_marks',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='int_1',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='int_2',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='int_3',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='studentenrollment',
            name='internal_marks',
            field=models.IntegerField(null=True),
        ),
    ]
