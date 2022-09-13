from django.urls import path
from .api_views import api_cars_all,api_cars_for_sale,api_customers,api_sales,api_sales_reps,api_rep_sales


urlpatterns = [
    path("transactions/",api_sales,name="transactions"),
    path("reps/",api_sales_reps,name="representatives"),
    path("customers/",api_customers,name="customers"),
    path("cars/",api_cars_all,name="cars"),
    path("cars/forsale",api_cars_for_sale,name="for_sale"),
    path("reps/<int:id>",api_rep_sales, name="rep_sales")
]
