# Generated by Django 3.2.15 on 2023-05-22 15:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0003_auto_20230520_2212'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='support',
            name='country',
        ),
    ]