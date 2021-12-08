const Restaurant = require('../Models/RestaurantModel');
const Customer = require("../Models/UserModel");
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

// const { secret } = require('../config/config');

const restaurantLogin = async (args) => {
    let restaurant = await Restaurant.findOne({ email: args.email});
    console.log(restaurant)
    console.log("restaurant")
    if (!restaurant) {
        return { status: 401, message: "NO_RESTAURANT" };
    }
    if (restaurant.length === 0) {
        return { status: 401, message: "NO_RESTAURANT" };
    }
    if (passwordHash.verify(args.password, restaurant.password)) {

        // const payload = { id: restaurant._id };
        // var token = jwt.sign(payload, secret, {
        //     expiresIn: 1008000
        // });
        // token = 'JWT ' + token;
        return { status: 200,message:restaurant.id };
    }
    else {
        return { status: 401, message: "INVALID_RESTAURANT_CREDENTIALS" };
    }
}

const customerLogin = async (args) => {
    let customer = await Customer.findOne({ email: args.email });
    if (!customer) {
        return { status: 401, message: "NO_CUSTOMER" };
    }
    if (customer.length === 0) {
        return { status: 401, message: "NO_CUSTOMER" };
    }
    if (passwordHash.verify(args.password, customer.password)) {
        // const payload = { customer_id: customer._id };
        // var token = jwt.sign(payload, secret, {
        //     expiresIn: 1008000
        // });
        // token = 'JWT ' + token;
        return { status: 200, message: "customer.id" };
    }
    else {
        return { status: 401, message: "INVALID_CUSTOMER_CREDENTIALS" };
    }
}
exports.customerLogin = customerLogin;
exports.restaurantLogin = restaurantLogin;
