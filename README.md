# Home Library Service

## Downloading, Installing and Running the App

- Clone the repository by running

```
git clone https://github.com/webjsmaster/nodejs2022Q4-service.git
```

- On your local machine `cd` to the folder with the cloned repository
- Install all NPM dependencies by running `npm i` from the command line ****(yarn is desirable not to use )****
- Rename the file `.env.example` into `.env`
- The application has two modes of running: development and production
- Run `npm run start` to run the application in the production mode
- Run `npm run start:dev` to run the application in the development mode
- Once the application is running, you can make CRUD requests to the relevant endpoints
- There is a swagger file showing available endpoints and required request body and response body.

[Swagger](https://github.com/webjsmaster/nodejs2022Q4-service/blob/6b48ed3bf708d2462f2230caa80c3aa8ce4f62fe/doc/api.yaml#L1-L792)

*You can also use* ***Postman Collections***

[Postman](https://github.com/webjsmaster/nodejs2022Q4-service/blob/development2/Nodejs2022Q4-service.postman_collection.json)

- To deploy the app and the database to docker, run `npm run docker:build`
- Run `npm run docker:start` to start the containers
- Run `npm run migration:run` to run migration table for database
- Run `npm run docker:test` to run the e2e tests inside the docker
- Run `npm run docker:scan:app` to scan the application for vulnerabilities
- Run `npm run docker:scan:db` to scan the database for vulnerabilities
- Run `npm run docker:stop` to stop the containers

- The application is running on port 4000
- The postgres database is running on port 5432