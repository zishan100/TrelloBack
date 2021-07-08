const express = require("express");
const {v4:uuidv4 } = require('uuid');
const router = express.Router();
const ListSchema = require('../models/trello');

router.post('/createtitle', (req, res, next) => {
        
    let {title,status} = req.body;
       
    const list = new ListSchema({
        id:uuidv4(),
        title: title,
        status:status
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
        .select('id title status')
        .then(list => {
            
          return res.status(200).json({
             result:list     
          })    
        })
        .catch(err => {
            console.log(err);
        })
       

});
router.post('/updatingStatus/',(req,res,next) => {
     
    let {status,id} = req.body;
        
    ListSchema.findOne({id:id})
      .then(list => {
          if (!list) {
              return;
           }
          
          list.status = status;
          
          return list.save();
          
      }).then(result => {
            
          if (!result) {
             
              return res.status(201).json({
                  result:'No list found' 
              }) 
           }
          console.log(result);
          res.status(200).json({
             result:result 
         }) 
          
      })
       .catch(err => {
          console.log(err);
      })



})


module.exports = router;
