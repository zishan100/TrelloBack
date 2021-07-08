const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const app = express();
 
const ControllerTrello = require('./router/user');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PUT ,DELETE ,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});


app.use(ControllerTrello);


app.use((req, res, next) => {
  const error = new Error();
   error.statusCode = 422;
   error.message = 'Page Not Found!';
   
   next(error);
})

app.use((error, req, res, next) => {
   const status = error.statusCode || 500;
   const message = error.message;
 return res.status(status).json({
    status: status,
    message: message
  });

})


mongoose.connect("mongodb+srv://NSE:w1UhFhjn6UtCQj0b@cluster0.5tkyb.mongodb.net/NSEDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("MongoDB Connect Successfully!")
    app.listen(PORT, function(err) {
      if (err) {
        console.log("Error in Server", err);
        return;
      }
      console.log("Server is Running up on port", PORT);
    });


  }).catch(error =>console.log("Error Occured!",error))





