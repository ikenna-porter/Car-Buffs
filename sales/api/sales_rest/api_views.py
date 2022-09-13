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
        "employee_num",
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
        "id"
    ]
    encoders = {
        "car":AutomobileEncoder(),
        "rep":SalesRepEncoder(),
        "customer":CustomerEncoder()
    }
    # def get_extra_data(self, o):
    #     return {"id":o.id}

@require_http_methods(["GET","POST"])
def api_sales_reps(request):
    if request.method == "GET":
        reps = SalesRepModel.objects.all()
        return JsonResponse(
            reps,
            encoder=SalesRepEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)
        rep = SalesRepModel.objects.create(**content)
        return JsonResponse(
            rep,
            encoder=SalesRepEncoder,
            safe = False
        )

@require_http_methods(["GET","POST"])
def api_customers(request):
    if request.method == "GET":
        customers = CustomerModel.objects.all()
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)
        cust = CustomerModel.objects.create(**content)
        return JsonResponse(
            cust,
            encoder=CustomerEncoder,
            safe = False
        )

@require_http_methods(["GET","POST"])
def api_sales(request):
    if request.method == "GET":
        sales = TransactionRecordModel.objects.all()
        return JsonResponse(
            sales,
            encoder=TransactionEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)
        
        try:
            AutomobileVO.objects.filter(vin=content['car']).update(for_sale=False)
            car = AutomobileVO.objects.get(vin = content['car'])
            content['car']=car
            
        except:
            print("Error turning vin into car object or setting for_sale state to false")
        try:
            customer = CustomerModel.objects.get(phone_number = content['customer'])
            
            content['customer']=customer
        except:
            print('Error turning customer phone number into customer object')
        try:
            rep = SalesRepModel.objects.get(employee_num = content['rep'])
            
            content['rep']=rep
        except:
            print('Error turning employee number into SalesRep Object')
        
        sale = TransactionRecordModel.objects.create(**content)
        print(sale)
        return JsonResponse(
            sale,
            encoder=TransactionEncoder,
            safe = False
        )

@require_http_methods(["GET","PUT"])
def api_cars_all(request):
    if request.method == "GET":
        cars = AutomobileVO.objects.all()
        return JsonResponse(
            cars,
            encoder=AutomobileEncoder,
            safe = False
        )
    else:
        content = json.loads(request.body)
        car = AutomobileVO.objects.get(vin = content.vin).update(**content)
        return JsonResponse(
            car,
            encoder=AutomobileEncoder,
            safe = False
        )

@require_http_methods(["GET"])
def api_cars_for_sale(request):
    cars = AutomobileVO.objects.filter(for_sale=True)
    return JsonResponse(
        cars,
        encoder=AutomobileEncoder,
        safe = False
    )

@require_http_methods("GET")
def api_rep_sales(request,id):
    sales = TransactionRecordModel.objects.filter(rep = SalesRepModel.objects.get(employee_num=id))
    return JsonResponse(
        sales,
        encoder = TransactionEncoder,
        safe = False
    )
