# Installation(Local)
## Client env setup
create .env file by following the example and give server url there.
After that goto client folder from terminal by using the following command
```
cd client
```
Then install all the node packages by executing the following command
``` 
yarn install
``` 

or 

```
npm install
```
Our application is now ready to run. Please use the following command to run application:
```
yarn run dev
```
## Server env setup
create .env file by following the example and give server url there.
After that goto server folder from terminal by using the following command
```
cd server
```
Then install all the node packages by executing the following command
``` 
yarn install
``` 

or 

```
npm install
```

For migrating with database, use the following command
```
npx prisma migrate dev --name init
```

after migration is completed use the following command to run the server
```
yarn run dev
```

# Docker setup
Will add support soon.

# Disclaimer
The application has many side effects.
- The design is not fixed.
- Functional side effects are not handled yet.
- All validation is not implemented yet.
