const Restaurant = require('../Models/RestaurantModel');

const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');
// const { secret } = require('../config/config');

const restaurantLogin = async (args) => {
    let restaurant = await Restaurant.findOne({ email: args.email});
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
        return { status: 200, message: "SUCCESS" };
    }
    else {
        return { status: 401, message: "INVALID_RESTAURANT_CREDENTIALS" };
    }
}

exports.restaurantLogin = restaurantLogin;
