const Order = require("../Models/OrderModel");
const createOrder = async (args) => {
    let new_order = new Order({
        userid: args.userid,
        restaurantid: args.restaurantid,
        status: "New Order",
        restaurantname: args.restaurantname,
        address: args.address,
        city:args.city,
        state:args.state,
        country:args.country,
        quantity: args.quantity,
        ordertype: args.ordertype,
        price:args.price,
        dishid:args.dishid,
        dishname:args.dishname
    });

    let success = await new_order.save();
    if (success) {
        return { status: 200, message: 'ORDER_PLACED' };
    }
    else {
        return { status: 500, message: 'ORDER_PLACE_ERROR' };
    }
};

const updateOrder = async (args) => {
    let order = await Order.findById(args.orderid);
    if (order) {
        order.status = args.status;

        let updated = await order.save();
        if (updated) {
            return { status: 200, message: "ORDER_STATUS_UPDATED" };
        }
        else {
            return { status: 500, message: "ORDER_STATUS_UPDATE_ERROR" };
        }
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};

exports.createOrder = createOrder;
exports.updateOrder = updateOrder;