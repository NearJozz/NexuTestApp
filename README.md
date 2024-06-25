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

For the models used, the value of the numerical ID fields was replaced by a natural UUID from mongodb

Add the url to your environment to link to the API

https://soft-art.org/nexutest/

example: https://soft-art.org/nexutest/brands/

The environment has CORS configured so that it can receive the request from any client