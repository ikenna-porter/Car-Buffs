from django.views.decorators.http import require_http_methods
from .models import Appointment, Technician, AutomobileVO, Service
from django.http import JsonResponse
from common.json import ModelEncoder
import json


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties =  [
        "name",
        "employee_id",
    ]

class AutomobileVOEncoder (ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]

class ServiceEncoder(ModelEncoder):
    model = Service
    properties = ["name"]

class AppointmentsListEncoder(ModelEncoder):
    model = Appointment
    properties = [
    "automobile",
    "vehicle_owner",
    "date",
    "time",
    "technician",
    "service",
    ]

    def get_extra_data(self, o):
        return {"href": o.get_api_url()}

    encoders = [
        {"technician" : TechnicianEncoder(), 
        "service": ServiceEncoder(), 
        "automobile": AutomobileVOEncoder()}
    ]

@require_http_methods(["GET"])
def service_list(request):
    service = Service.objects.all()
    return JsonResponse({"service": service}, encoder=ServiceEncoder, safe=False)

@require_http_methods(["GET"])
def automobile_list(request):
    automobile = AutomobileVO.objects.all()
    return JsonResponse({"automobile": automobile}, encoder=AutomobileVOEncoder, safe=False)


@require_http_methods(["POST", "GET"])
def list_technicians(request):
    if request.method == "POST":
        content = json.dumps(request.body)
        Technician.objects.create(**content)
        return JsonResponse({"message": "success"})
    else:
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder, safe=False)

@require_http_methods(["GET", "POST"])
def list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse({"appointments": appointments}, encoder=AppointmentsListEncoder)
    else: #POST
        content = json.laods(request.body)
        Appointment.objects.create(**content)
        return JsonResponse({"message": "appointment created"})

@require_http_methods
def appointment_detail():
    pass

@require_http_methods
def list_services():
    pass