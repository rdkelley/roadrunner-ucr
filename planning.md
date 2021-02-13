**Users**

Customers: Ship & track packages

Drivers: Deliver packages

Admin: Manage shipments and drivers

**MVP**

As a customer, I want to be able to add a shipment, get a tracking number

As a driver, I want to login and see a list of my deliveries, priority deliveries listed first

As a driver, I want to mark my deliveries as delivered

The backend should assign a driver automatically

**2.0**

As a driver and admin, I want to be able to see a map of all active deliveries

As a customer, I want to be able to see the status of a package by looking up the tracking number

**Tables**

users

shipments

**Routes**

GET /shipments
- Get all shipments where the status = placed or inTransit

POST /shipments
- Adds new shipment, returns tracking number

GET /shipments/driver/:driverid
- Get shipments for a specific driver

PUT /shipments/:tracking
- Updates shipment

POST /login
- Logins in a user

POST /logout
- Logs out a user