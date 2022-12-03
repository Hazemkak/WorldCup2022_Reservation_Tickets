# Generated by Django 4.1.2 on 2022-12-03 11:38

import django.core.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('stadiums', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='stadium',
            name='city',
            field=models.CharField(
                default=django.utils.timezone.now, max_length=32),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stadium',
            name='country',
            field=models.CharField(default='', max_length=32),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stadium',
            name='rows',
            field=models.PositiveIntegerField(
                default=1, validators=[django.core.validators.MinValueValidator(1)]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stadium',
            name='seatsPerRow',
            field=models.PositiveIntegerField(
                default=1, validators=[django.core.validators.MinValueValidator(1)]),
            preserve_default=False,
        ),
    ]
