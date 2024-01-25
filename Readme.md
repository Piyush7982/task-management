`Installation`
Before you begin, ensure you have the following prerequisites:
• A running MongoDB cluster. You will need your MongoDB
cluster URL for the setup.
Follow these steps to set up the backend:

1. Create an empty folder on your local machine.

2. Open this folder in your favorite code editor.

3. Open the terminal within your code editor.

4. Initialize a new Git repository by running the command:
   `git init`

5. Clone the project repository by running the command:
   `git clone https://github.com/Piyush7982/task-management.git`

6. Navigate into the cloned repository by running the
   command:
   `cd task-management`

7. Install the necessary dependencies by running the
   command:
   `npm i`

8. Open the `.env.example` file and enter the required fields,
   including your MongoDB cluster URL.

9. Rename the `.env.example` file to `.env`.
10. Start the application by running the command:
    `npm start`

You have now successfully set up the backend of the
TaskManager application on your local machine.

`CodeFlow`

The backend of the TaskManager application is structured to
prioritize modularity and separation of code. Here’s a brief
overview:

Model: This is where the Mongoose schema is defined. The
model represents the structure of the data that the application
will work with.

Repositories: The repository communicates with the model to
perform CRUD (Create, Read, Update, Delete) operations.
Services: This is where the business logic of the application is written. The services communicate with the repository to
manipulate data as per the business requirements

Controller: The controller contains route controllers for data
input. It acts as a bridge between the services and the routes.

Middleware: The middleware includes authentication
middleware and user input validation middleware. These
ensure that only authenticated requests are processed and that
the user input is valid.

Routes: The application’s endpoints are defined here. To check
the server status, go to `http://localhost:4000/status`. All other
routes use the format
`http://localhost:4000/api/v1/{routeName}`, where {routeName}
should be replaced by task or user.

Admin Routes: The admin routes allow admins to perform
various duties such as creating a new admin, removing
someone from admin, getting all users, and deleting users.
`http://localhost:4000/api/v1/admin`

Utils:
In addition to the aforementioned components, the backend
also includes a util folder. This folder contains various utility
functions that are used across the application. Here’s a brief
overview:

Custom Error Object: This utility is used to create a custom
error object. It provides a consistent structure for errors,
making them easier to handle.

ErrorResponse: This utility function is used to format and send
error responses. It ensures that all error responses have a
consistent structure.

SuccessResponse: Similar to ErrorResponse, this utility
function is used to format and send successful responses. It
ensures that all successful responses have a consistent
structure.

These utilities help in maintaining consistency in error handling
and response formatting across the application.

This structure ensures that each part of the code has a specific
purpose, making the codebase easier to manage and scale
