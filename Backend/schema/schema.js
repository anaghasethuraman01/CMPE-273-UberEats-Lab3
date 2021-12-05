const graphql = require('graphql');

const Restaurants = require('../Models/RestaurantModel');
const {restaurantSignup } = require('../mutations/signup');

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
        },
    });
    module.exports = new GraphQLSchema({
      query: RootQuery,
      mutation: Mutation,
    });
      