# Generated by Django 3.2 on 2024-05-02 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('space', '0003_auto_20240503_0101'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='upload',
            name='user',
        ),
    ]