const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const restDishSchema = require('./DishModel');
var restaurantSchema = new Schema({
    restaurantname: {type: String, required: true},
    email:    {type:String,required:true},
    password: {type: String, required: true},
    owner:{type: Boolean, required: true},
    city:{type:String,required:true},
    description: {type: String, required: false},
    phone: {type: String, required: false},
    address: {type: String, required: false},
    state: {type: String, required: false},
    country: {type: String, required: false},
    days: {type: String, required: false},
    timing: {type: String, required: false},
    deliverytype: {type: String, required: false},
    zipcode: {type: String, required: false},
    foodtype:{type:String,required:false},
    profilepic:{type:String,required:false},
    // rest_dishes: [restDishSchema],
},
{
    versionKey: false
});

const restaurantModel = mongoose.model('restaurant', restaurantSchema);
module.exports = restaurantModel;