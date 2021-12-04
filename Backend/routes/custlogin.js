// login api for customer

const express = require('express');
//const kafka = require('../kafka/client');
const router = express.Router();
//const jwt = require("jsonwebtoken");
// const { auth } = require("../utils/passport");
// const { secret } = require("../utils/config");
const bcrypt = require('bcrypt');
const Users = require('../Models/UserModel');
//auth();
router.post('/', (req, res) => {

	console.log("Inside Login");
	Users.find({ email: req.body.email}, (error, custlogin) => {
		//console.log(custlogin)
		if (error) {
			callback(null, error);
			console.log('Failed to fetch data');
		}
		if (custlogin.length > 0) {
	
			var password_hash = custlogin[0].password;
			const verified = bcrypt.compareSync(req.body.password, password_hash);
			
			if(verified){
				var obj = {
					message : "Customer Found",
					result : custlogin[0],
				}    
				console.log(obj);  
				//callback(null, obj);          
				 res.status('200').send(obj)
			}else{
				var obj = {
					message : "Invalid credentials",
				} 
				//callback(null, obj);    
				console.log( "Invalid credentials");  
				res.status('400').send(obj)
	
			}
			
		}
	
		
		else if(custlogin.length == 0) {
			var obj = {
				message : "Invalid User",   
			}  
			//callback(null, obj); 
			//res.send(obj);
			console.log( "Invalid User");  
			res.status('400').send(obj)
		}
	});
	 
	// kafka.make_request('customer_login', req.body, (err, data) => {
	// // 	console.log("*****")
    // //  console.log(data.message)
	// 	if (err) {
	// 	//   res.writeHead(400, {
	// 	// 	"content-type": "text/plain",
	// 	//   });
	// 	  res.end("Invalid Credentials");
	// 	}else if(data.message === "Customer Found"){
	// 		// res.writeHead(200, {
	// 		// 	"content-type": "text/plain",
	// 		//   });
	// 		const payload = {
    //             _id: data.result._id,
    //             username : data.result.username,
    //             email : data.result.email,
    //             phone : data.result.phone,
    //             about : data.result.about,
    //             nickname : data.result.nickname,
    //             dob :data.result.dob,
    //             address : data.result.address,
    //             city : data.result.city,
    //             state : data.result.state,
    //             country : data.result.country,
    //             message: data.message,
	// 			loginType:"customer"
    //           };
	// 		  const token = jwt.sign(payload, secret, {
	// 			expiresIn: 1008000,
	// 		  });
	// 		  data.token = "JWT " + token;
	// 		  res.status('200').send(JSON.stringify(data))
	// 		// console.log("Login success");
	// 	}else if(data.message === "Invalid credentials" || data.message === "Invalid User"){
	// 		// res.writeHead(400, {
	// 		// 	"content-type": "text/plain",
	// 		//   });
	// 		//res.send({ message: "Invalid credentials" });
	// 		// console.log(JSON.stringify(data))
	// 		  res.status('400').send(JSON.stringify(data))
	// 	}
	// });
	
});

module.exports = router;