# Generated by Django 4.0.3 on 2022-09-14 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_automobilevo_vip'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='vip',
            field=models.BooleanField(default=False, null=True),
        ),
    ]