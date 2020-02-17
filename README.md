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

Once it is created, be sure to add the option {force: true} to db.sync() in the /server/index.js file in order for Sequelize to create the new tables in our database. You also have to create a .env file in the root directory as some files on the back-end have it as an import.

Once that is completed, all you have to do is start the back-end Express server and concurrently runs webpack to bundle the front-end files together.

```
npm run start-dev
```

## Preview

If you want to look at an account with preexisting data on the production/deployed site, use these following credentials:

```
email: btan7645@gmail.com
password: 1
```

<img src="/public/resources/login.png" width="90%" height="90%">
<img src="/public/resources/transactions.png" width="90%" height="90%">

## Technologies

### Front-end

- React
- Redux
- Reach Router
- MaterialUI

### Back-end

- Node/Express
- PostgresSQL
- Sequelize ORM
- IEX API
