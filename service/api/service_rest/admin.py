from django.contrib import admin
from .models import AutomobileVO, Technician, Appointment
# from .models import Service


# Register your models here.

admin.site.register([AutomobileVO, Technician, Appointment])
# admin.site.register([Service])
