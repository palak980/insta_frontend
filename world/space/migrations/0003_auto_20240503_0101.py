# Generated by Django 3.2 on 2024-05-02 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('space', '0002_sharedupload_upload'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='upload',
            name='file',
        ),
        migrations.AddField(
            model_name='upload',
            name='image',
            field=models.ImageField(default=0, upload_to='uploads/'),
            preserve_default=False,
        ),
    ]
