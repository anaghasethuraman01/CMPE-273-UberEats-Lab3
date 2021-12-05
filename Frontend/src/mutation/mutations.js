
import { gql } from 'apollo-boost';

const addRestaurantMutation = gql`
mutation AddRestaurant($restaurantname: String, $email: String, $password: String, $city: String, $owner: Boolean){
    addRestaurant(restaurantname: $restaurantname, email: $email, password: $password, city: $city, owner : $owner){
        status
        message
    }
}
`;

export {
     addRestaurantMutation, 
    };