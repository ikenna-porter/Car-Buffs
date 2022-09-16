# CarCar

Team:

* Ikenna - Service
* Josh - Sales

## Design

## Service microservice
In order to represent all services performed on a particular automobile, I had to create three models: Technician, Appointment, AutomobileVO. 

The Technician model represents the person who will perform the service. Each technician is given a unique employee_id number and a name.

Appointments represent the date, time and service that will be performed by a technician on a customer's vehicle. 

Finally, the AutomobileVO--which was integrated with the Inventory microservice with a poller--retrieved instances of an automobile and saved each instance with a unique VIN identifier. this model was then used to register vehicles for an appointment.


## Sales microservice

Explain your models and integration with the inventory
microservice, here.
