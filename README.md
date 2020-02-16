# Stonks

A full-stack stocks application.

## Installation

Navigate to the project folder and install the required dependencies.

```
npm install
```

This project uses PostgresSQL for data persistence so after installing the node modules, be sure to create a db as well.

If you have the psql command line installed, you can create the database with the following command:

```
createdb stonks
```

Once it is created, be sure to add the option {force: true} to db.sync() in the /server/index.js file in order for Sequelize to create the new tables in our database.

Once that is completed, all you have to do is start the back-end Express server and concurrently runs webpack to bundle the front-end files together.

```
npm run start-dev
```
