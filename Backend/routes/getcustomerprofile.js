//getting customer profile details


const express = require('express');
//const kafka = require('../kafka/client');
const router = express.Router();
const Users = require('../Models/UserModel');
//const { checkAuth } = require("../utils/passport");
router.post('/',(req, res) => {
	Users.findOne({ _id: req.body.userid }, (error, getcustomerprofile) => {
		//console.log("I am here")
	 if (error) {
		res.status('400').send(error)
		 //res.send();
	 }
	 if (getcustomerprofile) {
					   
		res.status('200').send(getcustomerprofile)
		 
	 }
	 else {
		  var obj = {
			 message : "Invalid credentials",  
		 }   
		 res.status('400').send(obj)
			 
	 }
 });
	// kafka.make_request('customer_profile', req.body, (err, data) => {
    
	// 	if (err) {
	// 	  res.writeHead(400, {
	// 		"content-type": "text/plain",
	// 	  });
	// 	  //res.end("Invalid Credentials");
	// 	}else{

	// 		res.send(data)
	// 		console.log("customer profile");
	// 	}
	// });
	
});

 module.exports = router;

			


	   
		
			
		



// const express = require("express");
// const router = express();
// const app = require('../app');

// const Users = require('../Models/UserModel');

// app.post('/getcustomerprofile', (req, res) => {
//     //console.log(req.body)
// 	Users.findOne({ _id: req.body.userid }, (error, getcustomerprofile) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (getcustomerprofile) {
//             // var obj = {
//             //     message : "Customer Found",
//             //     result : getcustomerprofile,
//             // }                
//             res.send(getcustomerprofile);
			
// 		}
// 		else {
//              var obj = {
//                 message : "Invalid credentials",  
//             }   
//             res.send(obj);
				
// 		}
// 	});
//   });
// module.exports = router;






