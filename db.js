const Sequelize = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('journal-walkthrough', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been establish successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    })

module.exports = sequelize;