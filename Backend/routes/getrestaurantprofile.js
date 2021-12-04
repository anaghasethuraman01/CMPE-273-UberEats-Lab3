//fetching restaurant profile details


const Restaurants = require('../Models/RestaurantModel');
const express = require('express');
//const kafka = require('../kafka/client');
const router = express.Router();
//const { checkAuth } = require("../utils/passport");
router.post('/',(req, res) => {

	console.log("handle req rest profile")
    console.log(req)
    Restaurants.findOne({ _id: req.body.userid }, (error, getprofile) => {
	  // console.log("I am here")
    if (error) {
		res.status('400').send(error)
    }
    if (getprofile) {
                      
        //callback(null, getprofile); 
		res.status('200').send(getprofile)
        
    }
    else {
         var obj = {
            message : "Invalid credentials",  
        }   
        res.status('400').send(obj)
            
    }
});
	//res.status('400').send(error)
	// kafka.make_request('restaurant_profile', req.body, (err, data) => {
    //  console.log("rest details")
	//  console.log(req.body)
	// 	if (err) {
	// 	  res.writeHead(400, {
	// 		"content-type": "text/plain",
	// 	  });
	// 	  //res.end("Invalid Credentials");
	// 	}else{
	// 		res.send(data)
	// 		console.log("restaurant profile");
	// 	}
	// });
	
});

 module.exports = router;

			


	   
		
			
		









// const express = require("express");
// const router = express();
// const app = require('../app');
// const Restaurants = require('../Models/RestaurantModel');
// app.post('/getrestaurantprofile', (req, res) => {
// 	//console.log(req.body.userid)
// 	Restaurants.findOne({ _id: req.body.userid }, (error, getprofile) => {
	   
// 		if (error) {
// 			// res.writeHead(500, {
// 			// 	'Content-Type': 'text/plain'
// 			// })
// 			res.send();
// 		}
// 		if (getprofile) {
//             // var obj = {
//             //     message : "Customer Found",
//             //     result : getcustomerprofile,
//             // }                
//             res.send(getprofile);
			
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


