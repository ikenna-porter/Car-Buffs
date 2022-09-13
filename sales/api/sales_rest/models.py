from django.db import models

# Create your models here.
class CustomerModel(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=50,unique=True)
    def __str__(self):
        return self.name


class SalesRepModel(models.Model):
    name = models.CharField(max_length=100)
    employee_num = models.IntegerField(unique=True)
    def __str__(self):
        return self.name

class AutomobileVO(models.Model):
    for_sale = models.BooleanField(default = True)
    vin = models.CharField(max_length=100)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    year = models.CharField(max_length=100)
    def __str__(self):
        return f"{self.color} {self.year} {self.make} {self.model}"

class TransactionRecordModel(models.Model):
    car = models.ForeignKey(AutomobileVO,related_name="transaction_records", on_delete=models.PROTECT)
    rep = models.ForeignKey(SalesRepModel,related_name="transaction_records", on_delete=models.PROTECT)
    customer = models.ForeignKey(CustomerModel,related_name="transaction_records", on_delete=models.PROTECT)
    price = models.FloatField()
    def __str__(self):
        return f"Sale for {self.price} made by {self.rep.name} to {self.customer.name}"