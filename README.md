# CRUD API

----------------------------

- API are implemented on Typescript 
- Libraries and tools: nodemon, dotenv, typescript, ts-node, eslint and its plugins,webpack-cli, webpack and its plugins, uuid, @types/* as well as libraries used for testing (jest).
- Use 18 LTS version of Node.js

## 💻 How to install

-----------------------------

Clone the repository:

    git clone https://github.com/IgorBadyukov/crud-api.git
    
Switch to the branch dev:

    git checkout dev

Install dependencies

    npm insatll

## 🚀 How to run

--------------------------

The application is run in development mode using nodemon

    npm run start:dev

The application is run in production mode

    npm run start:prod

The application is run in multiprocessing mode

    npm run start:multi

Run tests 

    npm run test

Run linter

    npm run lint 

or 

    npm run lint:fix

## 💥 API

___________________________

Endpoint api/users:
* GET api/users is used to get all persons
  - Server should answer with status code 200 and all users records
* GET api/users/{userId}
  - Server should answer with status code 200 and and record with id === userId if it exists
  - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
* POST api/users is used to create record about new user and store it in database
  - Server should answer with status code 201 and newly created record
  - Server should answer with status code 400 and corresponding message if request body does not contain required fields
* PUT api/users/{userId} is used to update existing user
  - Server should answer with status code 200 and updated record
  - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
* DELETE api/users/{userId} is used to delete existing user from database
  - Server should answer with status code 204 if the record is found and deleted
  - Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
  - Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist


User fields:

    username: string,
    age: number
    hobbies: string[]

ID generated server side
