//login api for restuarant
const express = require('express');
//const kafka = require('../kafka/client');
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const { auth } = require("../utils/passport");
// const { secret } = require("../utils/config");
// auth();
const bcrypt = require("bcryptjs");
const Restaurants = require('../Models/RestaurantModel');
router.post('/', (req, res) => {

	console.log("Inside Restaurant Login");
	Restaurants.find({ email: req.body.email}, (error, restlogin) => {
     
		if (error) {
		  //   res.writeHead(500, {
		  //       'Content-Type': 'text/plain'
		  //   })
			console.log('Failed to fetch data');
		}
		if (restlogin.length > 0) {
	
			var password_hash = restlogin[0].password;
			const verified = bcrypt.compareSync(req.body.password, password_hash);
			
			if(verified){
				var obj = {
					message : "Restaurant Found",
					result : restlogin[0],
				}   
				console.log(obj) 
				//callback(null, obj);      
				res.status('200').send(obj)    
			   // res.send(obj);
			}else{
				var obj = {
					message : "Invalid credentials",
				} 
  
				//callback(null, obj);    
				res.status('400').send(obj)
				console.log( "Invalid credentials");  
				//res.send(obj);
			}   
		}
		else if(restlogin.length == 0) {
			var obj = {
				message : "Invalid User",   
			}  
			// callback(null, obj); 
			res.status('400').send(obj)
			console.log( "Invalid User");  
		}
	});
	// kafka.make_request('restaurant_login', req.body, (err, data) => {
    	
    //  //console.log(data.message)
	// 	if (err) {
	// 	  res.writeHead(400, {
	// 		"content-type": "text/plain",
	// 	  });
	// 	  res.end("Invalid Credentials");
	// 	}else if(data.message === "Restaurant Found"){
	// 		const payload = {
    //             _id: data.result._id,
    //             restaurantname : data.result.restaurantname,
    //             email : data.result.email,
    //             phone : data.result.phone,
    //             description : data.result.description,
    //             nickname : data.result.nickname,
    //             deliverytype :data.result.deliverytype,
    //             address : data.result.address,
    //             city : data.result.city,
    //             state : data.result.state,
    //             country : data.result.country,
	// 			foodtype:data.result.foodtype,
	// 			days:data.result.days,
	// 			zipcode:data.result.zipcode,
    //             message: data.message,
	// 			loginType:"restaurant"
    //           };
	// 		  const token = jwt.sign(payload, secret, {
	// 			expiresIn: 1008000,
	// 		  });
	// 		  data.token = "JWT " + token;
	// 		  res.send(JSON.stringify(data))
	// 		//res.send(JSON.stringify(data))
	// 		console.log("Login success");
	// 	}else if(data.message === "Invalid credentials" || data.message === "Invalid User"){
	// 		res.send(JSON.stringify(data))
	// 	}
	// });
	
});

module.exports = router;










