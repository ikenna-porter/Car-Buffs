from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .models import CustomerModel, SalesRepModel, AutomobileVO, TransactionRecordModel
from common.json import ModelEncoder

class CustomerEncoder(ModelEncoder):
    model = CustomerModel
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SalesRepEncoder(ModelEncoder):
    model = SalesRepModel
    properties = [
        "name",
        "employee_number",
    ]

class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "for_sale",
        "vin",
        "make",
        "model",
        "color",
        "year",
    ]

class TransactionEncoder(ModelEncoder):
    model = TransactionRecordModel
    properties = [
        "car",
        "rep",
        "customer",
        "price",
    ]
    encoders = {
        "car":AutomobileEncoder,
        "rep":SalesRepEncoder,
        "customer":CustomerEncoder
    }
    def get_extra_data(self, o):
        return {"id":o.id}

@require_http_methods(["GET","POST"])
def api_sales_reps(request):
    if request.method == "GET":
        reps = SalesRepModel.objects.all()
        return JsonResponse(
            reps,
            encoder=SalesRepEncoder
        )
    else:
        content = json.loads(request.body)
        rep = SalesRepModel.objects.create(**content)
        return JsonResponse(
            rep,
            encoder=SalesRepEncoder
        )

@require_http_methods(["GET","POST"])
def api_customers(request):
    if request.method == "GET":
        customers = CustomerModel.objects.all()
        return JsonResponse(
            customers,
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        cust = CustomerModel.objects.create(**content)
        return JsonResponse(
            cust,
            encoder=CustomerEncoder
        )

@require_http_methods(["GET","POST"])
def api_sales(request):
    if request.method == "GET":
        sales = TransactionRecordModel.objects.all()
        return JsonResponse(
            sales,
            encoder=TransactionEncoder
        )
    else:
        content = json.loads(request.body)
        sale = TransactionRecordModel.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=TransactionEncoder
        )

@require_http_methods(["GET","PUT"])
def api_cars_all(request):
    if request.method == "GET":
        cars = AutomobileVO.objects.all()
        return JsonResponse(
            cars,
            encoder=AutomobileEncoder
        )
    else:
        content = json.loads(request.body)
        car = AutomobileVO.objects.get(vin = content.vin).update(**content)
        return JsonResponse(
            car,
            encoder=AutomobileEncoder
        )

@require_http_methods(["GET"])
def api_cars_for_sale():
    cars = SalesRepModel.objects.filter(for_sale=True)
    return JsonResponse(
        cars,
        encoder=AutomobileEncoder
    )
