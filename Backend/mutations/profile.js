const Customer = require("../Models/UserModel");
const customerUpdate = async (args) => {
    let customer = await Customer.findOne({ email: args.email });
    if (customer) {

        customer.username = args.username?args.username:customer.username;
        customer.phone = args.phone?args.phone:customer.phone;
        customer.dob = args.dob?args.dob:customer.dob;
        customer.city = args.city?args.city:customer.city;
        customer.state = args.state?args.state:customer.state;
        customer.country = args.country?args.country:customer.country;
        customer.nickname = args.nickname?args.nickname:customer.nick_name;
        customer.about = args.about?args.about:customer.about;

        let updated = await customer.save();
        if (updated) {
           // console.log(`{ status: 200, message: "CUSTOMER_PROFILE_UPDATED"}`)
            return { status: 200, message: "CUSTOMER_PROFILE_UPDATED" };
        }
        else {
            return { status: 500, message: "CUSTOMER_PROFILE_UPDATE_ERROR" };
        }
    }
    else {
        return { status: 500, message: "INTERNAL_SERVER_ERROR" };
    }
};
exports.customerUpdate = customerUpdate;