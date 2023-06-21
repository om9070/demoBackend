const Sequelize=require("sequelize")

const sequelize = new Sequelize('demoproject', 'postgres', 'op12345', {
                host: 'localhost',
                dialect: 'postgres'
        });
try {
         console.log('Connection has been established successfully.');
       } catch (error) {
         console.error('Unable to connect to the database:',);
       }
module.exports=sequelize;