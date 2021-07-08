const express = require("express");
const {v4:uuidv4 } = require('uuid');
const router = express.Router();
const ListSchema = require('../models/trello');

router.post('/createtitle', (req, res, next) => {
        
    let {title} = req.body;
       
    const list = new ListSchema({
        id:uuidv4(),
        title:title
    })
    
    list.save()
        .then(result => {
             
           console.log(result);
          res.status(200).json({
            result:result         
          })  
       })
       .catch(err => {
          
           console.log(err);
        }) 
 
 })


router.get('/getlist/', (req, res, next) => {
       
    
    ListSchema.find()
        .select('id title')
        .then(list => {
            
          return res.status(200).json({
             result:list     
          })    
        })
        .catch(err => {
            console.log(err);
        })
       

});


module.exports = router;
