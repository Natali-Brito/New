# CRUD API

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![HTML](https://shields.io/badge/HTML-f06529?style=for-the-badge&logo=html5&logoColor=white&labelColor=f06529)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![JS](https://shields.io/badge/JavaScript-F7DF1E?&style=for-the-badge&logo=JavaScript&logoColor=000)

This is a Crud project built with Java Spring, Spring Security, JWT for authentication and H2 as a database to make API requests. On the client side, HTML, CSS and JavaScript were used to build the application interface.


## Usage

1. Start the Spring application with Maven.
2. The API will be accessible at http://localhost:8090
3. Run the HTML application from the sign up page http://127.0.0.1:5501/register.html


## API Endpoints
The API provides the following endpoints:

```markdown
GET /store - Retrieves a list of all registered stores.(all authenticated users)

GET /store/{id} - Retrieves the registered store by ID. (all authenticated users)

POST /store - Registers a new store (all authenticated users).

PUT /store/{id} - Updates a registered store (all authenticated users)

DELETE /store/{id} - Removes a registered store. (all authenticated users)

POST /auth/login - Logs into the application

POST /auth/register - Registers a new user in the application
```

## Authentication and Database
```
The API uses Spring Security for authentication control.

The project utilizes [H2] as the database. The necessary database migrations are managed using Flyway.
```
