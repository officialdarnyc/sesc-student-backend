# Student Application
This is a simple microservices-based application which exposes a RESTful API. It is written in TypeScript using the Node/Express framework. It is intended for use as part of the SESC module at Leeds Beckett University.

![component diagram](public/images/uml.png "Component Diagram")

## Features
1. Register/Log in - create a portal user and log in.
2. View Courses - view all the courses offered.
3. Enrol in Course - enrol in course. If this is your first enrolment, a student account is created at this point.
4. View Enrolments - view all the courses you are enrolled in.
5. View/Update Student Profile - view profile (includes student ID), update name and surname.
6. Graduation - view eligibility to graduate (must not have any outstanding invoices).


## Integrations
### 1. Database
The application integrates with a PostgreSQL relational database.

### 2. Finance
The application integrates with the [Student microservice](https://github.com/officialdarnyc/sesc-finance-backend) via REST.
1. When a student is created, this application sends a request to the Finance app to create an account.
2. When a student enrols in a course, this application sends a request to Finance to create an invoice.
3. The created invoice must be paid via the Finance Payment Portal.
4. When checking the student's eligibility to graduate, this application sends a request to Finance to see if there are any outstanding invoices.

### 3. Library
The application integrates with the [Library microservice](https://github.com/AidanCurley/CESBooks) via REST.
1. When a student is created, this application sends a request to the Library app to create an account.


## Run using Docker Compose
1. Rename the `.env.example` file inside the `Student` directory to `.env`:<br/>
2. From the `Student` directory, run the app and db services:<br/>
   `docker-compose up -d`
3. Connect to the student-backend container, run the following:
- `npm run migrate`
- `npm run seed:all`

## Test using Postman
Download Postman from https://www.postman.com/ and import the collections found in the `Student/postman` directory.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
Copyright (c) 2021 Ikenna Chiakwa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.