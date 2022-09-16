from django.urls import reverse
from django.db import models
# from inventory.api.inventory_rest.models import Automobile

class Technician(models.Model):
    name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    automobile = models.ForeignKey("AutomobileVO", on_delete=models.PROTECT, related_name="appointments")
    vehicle_owner = models.CharField(max_length=100)
    date = models.DateField()
    time = models.TimeField()
    technician = models.ForeignKey("Technician", on_delete=models.PROTECT, related_name="appointments")
    service = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("appointment_detail", kwargs={"vin": self.automobile})
    
    def __str__(self):
        return f'{self.service} for {self.vehicle_owner}'


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    vip = models.BooleanField(null=True, default=False)

    def __str__(self):
        return str(self.vin)
