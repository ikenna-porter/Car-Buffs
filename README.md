# CarCar

Team:

* Ikenna - Service
* Josh - Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

AutomobileVO model: This model takes all of the attributes of an automobile from the inventory and stores them in a value object in the sales database. In addition it has an additional value "For_sale" which indicates if the vehicle is currently available for purchase, and is updated when a vehicle is purchased. This value is also used in the view to filter so that only cars that are for sale are visible on the UI. This value can be utilized in further implementation if necessary to update the inventory with the information that a vehicle has been sold, though this has not been implemented due to best practices of not allowing microservices to edit the values of objects in other microservices.

Representative model: Keeps track of the name and Employee ID number of a sales representative. The employee ID number must be unique and is used to identify employees for api requests and communicate with the front end.

Customer Model: Keeps track of the name of a potential customer, their address, and their phone number. The phone number must be unique and is used to identify the customer for api requests and communication with the front end.

Transaction Records Model: Keeps track of transactions including the sales representative, the customer, the automobile, and the price it was sold for. The transaction ID is used to communicate with the front end as its unique identifier.



let data = await response.json()
data = data.manufacturers
