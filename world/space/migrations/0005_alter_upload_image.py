# Generated by Django 3.2 on 2024-05-03 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('space', '0004_remove_upload_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='upload',
            name='image',
            field=models.ImageField(upload_to=''),
        ),
    ]