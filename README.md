# NexuTestApp
 Backend incoming test


To initialize the database, run the following command:
```shell
npm run initDB
```

To initialize the full App, run the following command:
```shell
npm run main
```
To run unit test, run the following command:
```shell
npm run test
```
Mandatory:
The app requires a file named ".env" in its root directory that contains the environment variables. For example, the port on which the express server will listen to requests and the mongodb URL.

```shell
    MONGO_URI="mongodb://127.0.0.1:27017/nexuTest"
    PORT=3000
```

For the models used, the value of the numerical ID fields was replaced by a natural UUID from mongodb

Add the url to your environment to link to the API

https://soft-art.org/nexutest/

example: https://soft-art.org/nexutest/brands/

The environment has CORS configured so that it can receive the request from any client