# Generated by Django 4.1.2 on 2022-12-04 21:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teams', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='img_url',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
    ]