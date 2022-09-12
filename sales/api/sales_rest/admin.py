from django.contrib import admin
from .models import CustomerModel,SalesRepModel,TransactionRecordModel
# Register your models here.
admin.site.register(CustomerModel)
admin.site.register(SalesRepModel)
admin.site.register(TransactionRecordModel)
