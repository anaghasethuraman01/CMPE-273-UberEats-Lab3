const graphql = require('graphql');
const Customers = require("../Models/UserModel");
const Restaurants = require('../Models/RestaurantModel');
const {customerSignup,restaurantSignup } = require('../mutations/signup');
const {restaurantLogin ,customerLogin} = require('../mutations/login');

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
      phone: { type: GraphQLInt },
      address: { type: GraphQLString },
      state: { type: GraphQLString },
      country: { type: GraphQLString },
      timings: { type: GraphQLString },
      days: { type: GraphQLString },
      timings: { type: GraphQLString },
      deliverytype: { type: GraphQLString },
      zipcode: { type: GraphQLString },
      foodtype: { type: GraphQLString },
      profilepic: { type: GraphQLString },
    }),
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
            return customer;
          }
        },
      },
      restaurant: {
        type: RestaurantType,
        args: { id: { type: GraphQLString } },
        async resolve(parent, args) {
          console.log("Now here")
          const restaurant = await Restaurant.findById(args.id);
          if (restaurant) {
            return restaurant;
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
          
          return customerSignup(args);
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
        },
    });
    module.exports = new GraphQLSchema({
      query: RootQuery,
      mutation: Mutation,
    });
      