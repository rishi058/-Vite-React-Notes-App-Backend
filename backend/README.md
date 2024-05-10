# Node-Express Js CRUD Backend 

    1. A Node.js and Express.js backend project featuring CRUD operations on MongoDB, with HTTP methods: GET, POST, and DELETE.

    2. Implements JWT-based login and register functionality for user authentication.

    3. Utilizes MongoDB for CRUD operations, enabling efficient data management.

    4. Includes middleware for verifying authorized access, enhancing modularity of code.

    5. Logs comprehensive API access information, ensuring traceability and monitoring.

<br/>

### Note's App Frontend Repo [click to view](https://github.com/rishi058/-Vite-React-Notes-App)

<br/>

### This project is currently hosted on render.
### Hosted Link :- [https://vite-react-notes-app-backend.onrender.com]. Use this baseURL to test the api.

<br/>

## Table of Contents

- [Setup project on your local machine](#Setup-project-on-your-local-machine)
- [Endpoints](#Endpoints)
- [Logger](#Logger)

## Setup project on your local machine

    1. Ensure Node.js is installed on your PC. If not, download and install it from the official website.

    2. Clone the GitHub repository or download the .zip file and extract it to your desired location.

    3. Open any code editor or terminal, navigate to the project directory, and run the command `npm install` to install the required packages.

    4. Once the dependencies are installed, run `npm run dev` in the terminal to start the server.

    5. The server will run on localhost port 3000 by default. If you wish to change this, edit the `index.js` file accordingly.

## Endpoints

1.  [  /api/login  ] ____________ { POST }

        Request-Body : {
            "email" : "dummy@gmail.com",
            "password" : "12345678",
        }

        Success Response : {
            "message" : "Login Successful",
            "token" : "x.y.z"
        }
        
        Error Response : {"message" : "Error Message"}

2.  [  /api/register  ] ____________ { POST }

        Request-Body : {
            "name" : "Dummy",
            "email" : "dummy@gmail.com",
            "password" : "12345678",
        }

        Success Response : {
            "message" : "Login Successful",
            "token" : "x.y.z"
        }
        
        Error Response : {"message" : "Error Message"}

<br/>

#### Note: To use any '/user/' Api, you must pass token in header with every request.
#### Example : [ headers.Authorization = "Bearer ${accessToken}" ]

<br/>

3.  [  /api/notes  ] ____________ { GET }

        Success Response :
        {
            "username": "Dummy99",
            "data_count": 1,
            "data": [
                {
                    "_id": "6617c14fca774b9f6fde5132",
                    "title": "This is a title 3 ",
                    "content": "This is a content 2",
                    "createdAt": "2024-04-11T10:54:07.014Z",
                    "updatedAt": "2024-04-11T10:54:07.014Z",
                    "__v": 0
                }
            ]
        } 

        Error Response : {"message" : "Error Message"}

4.  [  /api/notes  ] ____________ { POST }

        Request-Body : {
            "title" : "This is a title",
            "content" : "This is a content",
        }

        Success Response : 
        {
            "message": "Note added successfully",
            "data": {
                "title": "This is a title 3 ",
                "content": "This is a content.... 2",
                "_id": "6619229666eafd5b83ba528e",
                "createdAt": "2024-04-12T12:01:26.144Z",
                "updatedAt": "2024-04-12T12:01:26.144Z",
                "__v": 0
            }
        }
        
        Error Response : {"message" : "Error Message"}

4.  [  /api/notes  ] ____________ { PUT }

        Request-Body : {
            "_id" : "6619229666eafd5b83ba528e",
            "title" : "This is a new title",
            "content" : "This is a new content"
        }
        
        Success Response : {"message": "Note updated successfully"}
        
        Error Response : {"message" : "Error Message"}

5.  [  /api/notes?id='notesId'  ] ____________ { DELETE }
        
        Success Response : {"message": "Note Deleted successfully"}
        
        Error Response : {"message" : "Error Message"} 

## Logger
    
    - Implemented logging middleware to record detailed API access information, enhancing traceability and monitoring of note-related activities.

    - It Logs the following details.

        1. Date and Time of Api hit.
        2. Status Code of the Api.
        3. Method of HTTP used.
        4. Name of the End Point Hit.
        5. Response time.
        6. Request Body.
        7. Response Body.

    - It displays diffrent color logs based on the status Code.

        |   Status Code   |      Color      |
        |-----------------|-----------------|
        |     1xx         |     Yellow      |
        |     2xx         |     Green       |
        |     3xx         |     Blue        |
        |     4xx         |     Red         |
        |     5xx         |     Orange      |

      
    - Made by using Morgan and chalk npm pacakge.

## Logger Snaphot  
![Screenshot 2024-04-11 180958](https://github.com/rishi058/-Vite-React-Notes-App-Backend/assets/97884033/7ec3a69b-7ae4-45bd-84e8-1f2f4e9b9859)

