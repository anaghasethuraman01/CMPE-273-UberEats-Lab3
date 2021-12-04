// //register page for restuarant
const bcrypt = require('bcrypt');
const Restaurants = require('../Models/RestaurantModel');
const express = require('express');
//const kafka = require('../kafka/client');
const router = express.Router();

router.post('/', (req, res) => {

	console.log("Inside Restaurant Register");
	const password = bcrypt.hashSync(req.body.password, 10);
	var newuser = new Restaurants({
		restaurantname : req.body.name,
		email:req.body.email,
		password:password,
		owner:req.body.owner,
		city:req.body.city
	});
  
    Restaurants.findOne({ email: req.body.email }, (error, register) => {
	   
		if (error) {
			res.status('400').send(error)
		}
		if (register) {
            var obj = {
                message : "Email already exists",
                
            }    
            
            res.status('400').send(obj)
		}
		else {
		  newuser.save((error, data) => {
				if (error) {
					//res.send();
				}
				else {
                    var obj = {
                        message : "User Registration successful",
                        
                    }    
                    res.status('200').send(obj)
                    
	
				}
			});
		}
	});
       
	// kafka.make_request('restaurant_register', req.body, (err, data) => {
    
	// 	if (err) {
	// 	  res.writeHead(400, {
	// 		"content-type": "text/plain",
	// 	  });
	// 	  res.end("Invalid Credentials");
	// 	}else{

	// 		res.send(JSON.stringify(data))
	// 		console.log("Register success");
	// 	}
	// });
	
});

 module.exports = router;

			
