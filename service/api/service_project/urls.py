"""service_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import  path
from service_rest.api_views import list_technicians, list_appointments

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/technicians/", list_technicians, name="technician_list"),
    path("api/appointments/", list_appointments, name="appointments_list"),
    path("api/appointments/<str:vin>/", list_appointments, name="appointment_detail"),
]
