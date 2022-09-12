from django.contrib import admin
from .models import AutomobileVO, Technician, Service, Appointment


# Register your models here.

admin.site.register([AutomobileVO, Technician, Service, Appointment])
