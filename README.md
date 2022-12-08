# Car Buffs

## Set Up
If you would like to run this application on your own computer, follow these instructions:

1) If you do not have Docker, install it: https://docs.docker.com/get-docker/
2) Fork and clone the repository
3) Once it's been cloned onto your machine, open the terminal and enter `docker volume create beta-data`
4) Afterwards enter the command `docker compose build` to build the docker images for each container
5) Run `docker compose up` to run each container
6) Open your browser and type "localhost:3000" in the address box (you may need to wait a couple of minutes)

## Design

## Service microservice
In order to represent all services performed on a particular automobile, I had to create three models: Technician, Appointment, AutomobileVO. 

The Technician model represents the person who will perform the service. Each technician is given a unique employee_id number and a name.

Appointments represent the date, time and service that will be performed by a technician on a customer's vehicle. 

Finally, the AutomobileVO--which was integrated with the Inventory microservice with a poller--retrieved instances of an automobile and saved each instance with a unique VIN identifier. this model was then used to register vehicles for an appointment.


## Sales microservice

AutomobileVO model: This model takes all of the attributes of an automobile from the inventory and stores them in a value object in the sales database. In addition it has an additional value "For_sale" which indicates if the vehicle is currently available for purchase, and is updated when a vehicle is purchased. This value is also used in the view to filter so that only cars that are for sale are visible on the UI. This value can be utilized in further implementation if necessary to update the inventory with the information that a vehicle has been sold, though this has not been implemented due to best practices of not allowing microservices to edit the values of objects in other microservices.

Representative model: Keeps track of the name and Employee ID number of a sales representative. The employee ID number must be unique and is used to identify employees for api requests and communicate with the front end.

Customer Model: Keeps track of the name of a potential customer, their address, and their phone number. The phone number must be unique and is used to identify the customer for api requests and communication with the front end.

Transaction Records Model: Keeps track of transactions including the sales representative, the customer, the automobile, and the price it was sold for. The transaction ID is used to communicate with the front end as its unique identifier.



Creators:
* Ikenna - Service
* Josh - Sales

let data = await response.json()
data = data.manufacturers


