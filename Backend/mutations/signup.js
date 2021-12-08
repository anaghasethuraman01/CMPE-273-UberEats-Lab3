const Restaurant = require('../Models/RestaurantModel');
const Customer = require("../Models/UserModel");
const passwordHash = require('password-hash');

const restaurantSignup = async (args) => {
  
    let hashedPassword = passwordHash.generate(args.password);

    let newRestaurant = new Restaurant({
        restaurantname: args.restaurantname,
        email: args.email,
        password: hashedPassword,
        city: args.city,
        owner: args.owner
    });

    let restaurant = await Restaurant.find({ email: args.email });
    
    if (restaurant.length) {
        return { status: 400, message: 'REST_PRESENT' };
    }
    let success = await newRestaurant.save();
    if (success) {
        
        return { status: 200, message: 'REST_SIGNUP_SUCCESS' };
    }
    else {
       
        return { status: 500, message: 'REST_SIGNUP_ERROR' };
    }
};
const customerSignup = async (args) => {
    
    let hashedPassword = passwordHash.generate(args.password);

    let newCustomer = new Customer({
        username: args.username,
        email: args.email,
        password: hashedPassword,
        city: args.city,
        owner: args.owner
    });

    let customer = await Customer.find({ email: args.email });
    
    if (customer.length) {
        return { status: 400, message: 'CUST_PRESENT' };
    }
    let success = await newCustomer.save();
    if (success) {
       
        return { status: 200, message: 'CUST_SIGNUP_SUCCESS' };
    }
    else {
        return { status: 500, message: 'CUST_SIGNUP_ERROR' };
    }
};
exports.customerSignup = customerSignup;
exports.restaurantSignup = restaurantSignup;