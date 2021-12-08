import { gql } from 'apollo-boost';
const getCustomerQuery = gql`
    query($id: String){
        customer(id: $id) {
            username
            email
            owner
            about
            dob
            address
            state
            city
            country
            nickname
            phone
            profilepic
        }
    }
`;

const getRestaurantQuery = gql`
    query($id: String){
        restaurant(id: $id) {
            restaurantname
            email
            owner
            city 
            description
            phone 
            address
            state
            country
            timings
            deliverytype
            zipcode
            profilepic 
        }
    }
`;
const getRestaurantsQuery = gql`
    query($input: String){
        restaurants(input: $input) {
            id
            restaurantname
            email
            deliverytype
            phone
            description
            timings
            address
            state
            country
            zipcode
            profilepic 
            
        }
    }
`;

const getRestaurantMenuQuery = gql`
query($restaurantid: String){
    restdishes(restaurantid: $restaurantid) {
        dishname
        ingrediants
        description
        price
        category
        foodtype
    }
}
`;

const getRestaurantOrdersQuery = gql`
query($restaurantid: String){
    restaurantOrders(restaurantid: $restaurantid) {
        userid
        restaurantid
        restaurantname
        customername
        city
        state
        country
        dishname
        quantity
        price
        datetime
        dishid
    }
}
`;
export { getCustomerQuery ,getRestaurantQuery,
    getRestaurantsQuery, getRestaurantMenuQuery,
    getRestaurantOrdersQuery};