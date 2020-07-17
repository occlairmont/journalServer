require('dotenv').config();
var express = require('express');
var app = express();
let journal = require('./controllers/journalcontroller');
let user = require ('./controllers/usercontroller');
app.use(require('./middleware/headers')); 

const sequelize = require('./db');

// app.use('/test', function(req, res){
//     res.send('This is a test route');
// });

//create endpoint called about-me
//response = 'My name is ____ and my age is ____'

// app.use('/about-me', function(req, res){
//     res.send('My name is Octavia and my age is 33')
// })

// Have an endpoint of journal/practice
// send a response from that endpoint (This is the practice route)
sequelize.sync();

app.use(express.json());

app.use('/user', user);

app.use('/journal', journal);

app.listen(3001, function(){
    console.log('app is listening on port 3001');
});