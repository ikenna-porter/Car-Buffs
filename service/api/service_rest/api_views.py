from django.views.decorators.http import require_http_methods
from .models import Appointment, Technician, AutomobileVO, Service
from django.http import JsonResponse
from common.json import ModelEncoder, DateEncoder
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
    "id",
    ]

    def get_extra_data(self, o):
        return {"href": o.get_api_url()}

    encoders = {
        "technician" : TechnicianEncoder(), 
        "service": ServiceEncoder(), 
        "automobile": AutomobileVOEncoder(),
        }



# @require_http_methods(["GET"])
# def service_list(request):
#     service = Service.objects.all()
#     return JsonResponse({"service": service}, encoder=ServiceEncoder, safe=False)


@require_http_methods(["GET"])
def automobile_list(request):
    automobile = AutomobileVO.objects.all()
    return JsonResponse({"automobile": automobile}, encoder=AutomobileVOEncoder, safe=False)


@require_http_methods(["POST", "GET"])
def list_technicians(request):
    if request.method == "POST":
        content = json.loads(request.body)
        technician = Technician.objects.create(**content)
        return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
    else:
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians}, encoder=TechnicianEncoder, safe=False)


@require_http_methods(["GET", "POST"])
def list_appointments(request):

    if request.method == "GET":
        appointments = Appointment.objects.all()
        for app in appointments:
            app.date = json.dumps({"date":app.date}, default=str)
            app.time = json.dumps({"time":app.time}, default=str)

        return JsonResponse(appointments, encoder=AppointmentsListEncoder, safe=False)

    else: #POST
        content = json.loads(request.body)

        content["automobile"] = AutomobileVO.objects.get(vin=content["automobile"])
        content["technician"] = Technician.objects.get(employee_id=content["technician"])
        content["service"] = Service.objects.get(name=content["service"])

        appointment = Appointment.objects.create(**content)

        return JsonResponse(appointment, encoder=AppointmentsListEncoder, safe=False)

@require_http_methods(["GET"])
def list_services(request):
    services = Service.objects.all()
    return JsonResponse(
        {"services": services},
        encoder=ServiceEncoder,
        safe=False
    )

@require_http_methods(["GET", "DELETE"])
def appointment_detail(request, vin=None):
    if request.method == "GET":
        if (vin):
            appointments = Appointment.objects.filter(automobile=AutomobileVO.objects.get(vin=vin))
            for app in appointments:
                app.date = json.dumps({"date":app.date}, default=str)
                app.time = json.dumps({"time":app.time}, default=str)

            return JsonResponse(appointments, encoder=AppointmentsListEncoder, safe=False)
    else:
        content = json.loads(request.body)
        print(content)
        Appointment.objects.get(id=content["id"]).delete()
        return JsonResponse(
            {"Deleted": "Content deleted"}
        )



