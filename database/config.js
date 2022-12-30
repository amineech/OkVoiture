const Sequelize = require('sequelize');

const host = process.env.HOST;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE_NAME;

const sequelize = new Sequelize(database, username, password, {
    hostname: host,
    dialect: 'mysql',
    logging: false // disable logging queries's results into the console
});

sequelize.authenticate()
        .then(() => {
           console.log('Connection made'); 
        })
        .catch((err) => {
            console.log(`Connection failed, error: ${err} `);
        });

module.exports = sequelize;
