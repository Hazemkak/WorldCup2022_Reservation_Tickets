# Generated by Django 4.1.2 on 2022-12-08 07:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('matches', '0004_alter_match_match_date_alter_match_match_time'),
        ('reservations', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='reservation',
            old_name='matchId',
            new_name='match_id',
        ),
        migrations.RenameField(
            model_name='reservation',
            old_name='userId',
            new_name='user_id',
        ),
        migrations.AlterUniqueTogether(
            name='reservation',
            unique_together={('match_id', 'seatId')},
        ),
    ]
