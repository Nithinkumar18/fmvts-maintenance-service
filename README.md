# 👨🏻‍🔧 FMVTS Maintenance Microservice

The **FMVTS Maintenance Microservice** is responsible for **identifying vehicles that are due for maintenance** and triggering **maintenance notifications** within the Fleet Management and Vehicle Tracking System (FMVTS).

This service operates in a **secure, role-restricted, and event-driven manner**, ensuring that maintenance checks are performed only by authorized users and that relevant fleet managers are notified promptly.

---

## 📌 Core Responsibilities

- Fetch vehicles that are due for maintenance
- Communicate with the **Vehicle Microservice** to retrieve vehicle data
- Restrict maintenance checks to **Admin role only**
- Publish maintenance-related events to the **event queue**
- Enable asynchronous notification processing by downstream services

---

## 🏗️ Architecture Role

Admin
|
v
Maintenance Microservice
|
v
Vehicle Microservice
|
v
Event Queue (RabbitMQ)
|
v
Notification Microservice



- The Maintenance Microservice **does not store vehicle data**
- It relies on the Vehicle Microservice as the source of truth
- Maintenance results are published asynchronously to the event queue

---

## 🔐 Authentication & Authorization

- All endpoints are protected using **JWT authentication**
- Access to maintenance checks is restricted to users with the **admin role**
- Role validation is enforced using middleware before processing requests

---

## 🔄 Event-Driven Maintenance Workflow

1. Admin triggers the maintenance check endpoint
2. Maintenance Service requests vehicle data from Vehicle Microservice
3. Vehicles due for maintenance are identified
4. Maintenance data is published to the event queue
5. Notification Microservice subscribes to the event
6. Fleet managers are notified about maintenance requirements

This approach ensures **loose coupling** and **scalable notification handling**.

---


▶️ Running the Service

    Install Dependencies

       npm install

   
   Start Application

       npm start





