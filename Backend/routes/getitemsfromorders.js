//loading all customer order for a particular customer

const express = require('express');
const kafka = require('../kafka/client');
const router = express.Router();
//const { checkAuth } = require("../utils/passport");
router.post('/',(req, res) => {
  console.log(req.body)
	kafka.make_request('customerorders', req.body, (err, data) => {
		console.log(data)
		if (err) {
		  res.writeHead(400, {
			"content-type": "text/plain",
		  });
		  //res.end("Invalid Credentials");
		}else{
			res.status('200').end(JSON.stringify(data))
			console.log("Orders");
		}
	});
	
});

 module.exports = router;

// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require('../connection.js');

// router.post('/', function(req,res){
//     //console.log("Inside Orders");  
//     const customerid = req.body.customerid;  
//     res.writeHead(200,{
//         'Content-Type' : 'application/json'
//     });
// 	let sql1 = "SELECT * FROM orders WHERE customerid = "+mysql.escape(customerid) ;
//     let query = connection.query(sql1, (error, result) => {
	
//     if (error) {
//                 res.send({ error: error });
//         }
// 		//console.log(JSON.stringify(result));	
// 		res.end(JSON.stringify(result));
// 	});
   
    
// });
// module.exports = router;