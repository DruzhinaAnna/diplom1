# Generated by Django 3.2.15 on 2023-06-06 21:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_alter_resume_file'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resume',
            name='file',
            field=models.FileField(null=True, upload_to='files/'),
        ),
    ]