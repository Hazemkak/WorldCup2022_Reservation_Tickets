# Generated by Django 4.1.2 on 2022-12-08 07:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reservations', '0002_rename_matchid_reservation_match_id_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='match_id',
            new_name='match',
        ),
        migrations.RenameField(
            model_name='reservation',
            old_name='user_id',
            new_name='user',
        ),
    ]