# Generated by Django 4.1.2 on 2022-12-02 20:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=128)),
                ('password', models.CharField(max_length=128)),
                ('firstName', models.CharField(max_length=64)),
                ('lastName', models.CharField(max_length=64)),
                ('email', models.CharField(max_length=128)),
                ('birthDate', models.DateField()),
                ('gender', models.CharField(choices=[('0', 'Female'), ('1', 'Male')], max_length=8)),
                ('role', models.CharField(choices=[('2', 'Admin'), ('1', 'Manager'), ('0', 'Fan')], default='0', max_length=8)),
                ('nationality', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]
