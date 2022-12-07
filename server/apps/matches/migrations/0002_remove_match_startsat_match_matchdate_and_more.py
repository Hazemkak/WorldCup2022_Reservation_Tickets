# Generated by Django 4.1.3 on 2022-12-05 21:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='match',
            name='startsAt',
        ),
        migrations.AddField(
            model_name='match',
            name='matchDate',
            field=models.DateField(blank=True, default=datetime.datetime.now),
        ),
        migrations.AddField(
            model_name='match',
            name='matchTime',
            field=models.TimeField(blank=True, default=datetime.datetime.now),
        ),
    ]
