const graphql = require('graphql');
const Customer = require("../Models/UserModel");
const Restaurant = require('../Models/RestaurantModel');
const Dish = require('../Models/DishModel');
const Order = require('../Models/OrderModel');
const {customerSignup,restaurantSignup } = require('../mutations/signup');
const {restaurantLogin ,customerLogin} = require('../mutations/login');
const {addDish } = require('../mutations/adddish');
const { customerUpdate } = require('../mutations/profile');
const { createOrder, updateOrder } = require('../mutations/orders');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    
  } = graphql;
  const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
     
      id: { type: GraphQLID },
      username: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      owner: { type: GraphQLBoolean },
      about: { type: GraphQLString },
      dob: { type: GraphQLString },
      address: { type: GraphQLString },
      state: { type: GraphQLString },
      city: { type: GraphQLString },
      country: { type: GraphQLString },
      nickname: { type: GraphQLString },
      phone: { type: GraphQLInt},
      profilepic: { type: GraphQLString },
      
    }),
  });
  const RestaurantType = new GraphQLObjectType({
    name: 'Restaurant',
    fields: () => ({
      id: { type: GraphQLID },
      restaurantname: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
      owner: { type: GraphQLBoolean },
      city: { type: GraphQLString },
      description: { type: GraphQLString },
      phone: { type: GraphQLString },
      address: { type: GraphQLString },
      state: { type: GraphQLString },
      country: { type: GraphQLString },
      timings: { type: GraphQLString },
      days: { type: GraphQLString },
      deliverytype: { type: GraphQLString },
      zipcode: { type: GraphQLString },
      foodtype: { type: GraphQLString },
      profilepic: { type: GraphQLString },
    }),
  });
  const RestDishType = new GraphQLObjectType({
    name: 'RestDish',
    fields: () => ({
      id: { type: GraphQLID },
      dishname: { type: GraphQLString },
      ingrediants: { type: GraphQLString },
      price: { type: GraphQLString },
      category: { type: GraphQLString },
      description: { type: GraphQLString },
      foodtype: { type: GraphQLString }, 
    }),
  });
  const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
      id: { type: GraphQLID },
      status: { type: GraphQLString },
      create_time: { type: GraphQLString },
      delivery_method: { type: GraphQLString },
      dish_name: { type: GraphQLString },
      quantity: { type: GraphQLInt },
      restaurant_id: { type: GraphQLID },
      customer_id: { type: GraphQLID },
      restaurant_name: { type: GraphQLString },
    })
    });
  const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
      status: { type: GraphQLString },
      message: { type: GraphQLString },
    }),
  });
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      customer: {
        type: CustomerType,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args) {
          const customer = await Customer.findById(args.id);
          if (customer) {
            console.log(customer)
            return customer;
          }
        },
      },
      restaurant: {
        type: RestaurantType,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args) {
          const restaurant = await Restaurant.findById(args.id);
          if (restaurant) {
            return restaurant;
          }
        },
      },
      restaurants: {
        type: new GraphQLList(RestaurantType),
        args: { input: { type: GraphQLString } },
        async resolve(parent, args) {
          const restaurants = await Restaurant.find();
          // const restaurants = await Restaurant.find();
          if (restaurants) {
            console.log(restaurants)
            return restaurants;
          }
        },
      },
      menu: {
        type: new GraphQLList(RestDishType),
        args: { restaurantid: { type: GraphQLString } },
        async resolve(parent, args) {
          const restaurant = await Dish.findById(args.restaurantid);
          if (restaurant) {
            const menu = restaurant.rest_dishes;
            return menu;
          }
        },
      },
      customerOrders: {
      type: new GraphQLList(OrderType),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const orders = await Order.find({ id: args.id });
        if (orders) {
          return orders;
        }
      },
    },

    restaurantOrders: {
      type: new GraphQLList(OrderType),
      args: { restaurantid: { type: GraphQLString } },
      async resolve(parent, args) {
        const orders = await Order.find({ restaurantid: args.restaurantid });
        if (orders) {
          return orders;
        }
      },
    },
    }
  })
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addCustomer: {
        type: StatusType,
        args: {
          username: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
          city: { type: GraphQLString },
          owner: { type: GraphQLBoolean}
        },
        async resolve(parent, args) {
          
          return customerSignup(args)
          
        },
      },
        addRestaurant: {
            type: StatusType,
            args: {
              restaurantname: { type: GraphQLString },
              email: { type: GraphQLString },
              password: { type: GraphQLString },
              city: { type: GraphQLString },
              owner:{ type : GraphQLBoolean}
            },
            async resolve(parent, args) {
            return restaurantSignup(args)
            },
          },
          customerLogin: {
            type: StatusType,
            args: {
              email: { type: GraphQLString },
              password: { type: GraphQLString },
            },
            resolve(parent, args) {
              return customerLogin(args);
            },
          },
          restaurantLogin: {
            type: StatusType,
            args: {
              email: { type: GraphQLString },
              password: { type: GraphQLString },
            },
            resolve(parent, args) {
              return restaurantLogin(args);
            },
          },
          
          addDish: {
            type: StatusType,
            args: {
              restaurantid: { type: GraphQLString },
              dishname: { type: GraphQLString },
              ingrediants: { type: GraphQLString },
              price: { type: GraphQLString},
              category: { type: GraphQLString },
              description: { type: GraphQLString },
              foodtype:{ type: GraphQLString}
            },
            async resolve(parent, args) {
              return addDish(args);
            },
          },

          customerUpdate: {
            type: StatusType,
            args: {
              username: { type: GraphQLString },
              phone: { type: GraphQLString },
              dob: { type: GraphQLString },
              city: { type: GraphQLString },
              state: { type: GraphQLString },
              country: { type: GraphQLString },
              nickname: { type: GraphQLString },
              about: { type: GraphQLString },
              email: { type: GraphQLString },
            },
            async resolve(parent, args) { 
              return customerUpdate(args).then((results) => {
                console.log("result: "+JSON.stringify(results));
                return results;
              });;
            },
          },
          createOrder: {
            type: StatusType,
            args: {
              userid: { type: GraphQLString },
              restaurantid: { type: GraphQLString },
              deliverytype: { type: GraphQLString },
              dishname: { type: GraphQLString },
              quantity: { type: GraphQLInt },
              restaurantname: { type: GraphQLString },
              restaurantid: { type: GraphQLString }
            },
            async resolve(parent, args) {
              return createOrder(args);
            },
          },

          updateOrder: {
            type: StatusType,
            args: {
              order_id: { type: GraphQLString },
              status: { type: GraphQLString },
            },
            async resolve(parent, args) {
              return updateOrder(args)
            },
          },


      
        },
    });
    module.exports = new GraphQLSchema({
      query: RootQuery,
      mutation: Mutation,
    });
      
   