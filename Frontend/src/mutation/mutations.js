
import { gql } from 'apollo-boost';

const addCustomerMutation = gql`
    mutation AddCustomer($username: String, $email: String, $password: String, $city: String, $owner:Boolean){
        addCustomer(username: $username, email: $email, password: $password,city: $city, owner : $owner){
            status
            message
        }
    }
`;

const addRestaurantMutation = gql`
mutation AddRestaurant($restaurantname: String, $email: String, $password: String, $city: String, $owner: Boolean){
    addRestaurant(restaurantname: $restaurantname, email: $email, password: $password, city: $city, owner : $owner){
        status
        message
    }
}
`;
const customerLoginMutation = gql`
mutation CustomerLogin($email: String, $password: String){
    customerLogin(email: $email, password: $password){
        message
        status
    }
}
`;
const restaurantLoginMutation = gql`
mutation RestaurantLogin($email: String, $password: String){
    restaurantLogin(email: $email, password: $password){
        message
        status
    }
}
`;


export {
     addRestaurantMutation, restaurantLoginMutation,
     addCustomerMutation,customerLoginMutation
    };