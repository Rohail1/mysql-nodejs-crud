/**
 * Created by rohail on 1/9/2017.
 */

"use strict";

let express = require('express');
let bodyParser = require('body-parser');
let mysql = require('mysql');
let morgan = require('morgan');
let app = express();
let config = require('./config/config');
let connection = mysql.createConnection(config.dbConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended :true}));
app.use(morgan('dev'));

connection.connect((err)=> {
  if(err){
    console.log('error',err);
  }else {
    console.log('successfully connected to Database ',config.dbConfig.database);
  }
});
connection.on('error', (err) => {
  console.log('error',err);
});
require('./routes/route')(app,express,connection);
app.listen(3000,() =>{
  console.log('server listening on Port 3000');
});