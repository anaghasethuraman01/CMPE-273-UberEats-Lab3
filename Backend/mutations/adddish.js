const Dish = require("../Models/DishModel");

const addDish = async (args) => {
    let newDish = new Dish({
        restaurantid: args.restaurantid,
        dishname: args.dishname,
        ingrediants: args.ingrediants,
        price: args.price,
        category: args.category,
        description: args.description,
        foodtype: args.foodtype

    });
    let success = await newDish.save();
    if (success) {
        return { status: 200, message: 'ADD_DISH_SUCCESS' };
    }
    else {
        return { status: 500, message: 'ADD_DISH_ERROR' };
    }
};
exports.addDish = addDish;