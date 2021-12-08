
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

const addDishMutation = gql`
mutation AddDish($restaurantid: String, $dishname: String, $ingrediants: String, $price: String, 
   $description: String, $category: String,$foodtype:String ){
    addDish(restaurantid: $restaurantid, dishname: $dishname, ingrediants: $ingrediants, price: $price, 
        description: $description, category: $category, foodtype: $foodtype){
        message
        status
    }
}
`;

const addToCartMutation = gql`
mutation AddCart($customerid: String, $deliverytype: String, $restaurantid: String, $dishid: String, 
    $dishname: String, $dishprice: String,$quantity:String ,$quantityprice:String){
     addCart(customerid: $customerid, deliverytype: $deliverytype, restaurantid: $restaurantid, dishid: $dishid, 
        dishname: $dishname, dishprice: $dishprice, quantity: $quantity,quantityprice:$quantityprice ){
         message
         status
     }
 }
`;

const customerUpdateMutation = gql`
mutation CustomerUpdate($email: String, $username: String, $phone: String, 
    $dob: String, $city: String, $state: String, $country: String,
    $nickname: String, $about: String){
    customerUpdate(email: $email, username: $username, phone: $phone, 
        dob: $dob, city: $city, state: $state, country: $country,
        nickname: $nickname, about: $about){
        message
        status
    }
}
`;
const updateOrderMutation = gql`
mutation UpdateOrder($orderid: String, $status: String){
    updateOrder(orderid: $orderid, status: $status){
        message
        status
    }
}
`;
export {
     addRestaurantMutation, restaurantLoginMutation,
     addCustomerMutation,customerLoginMutation,
     addDishMutation,addToCartMutation,
     customerUpdateMutation,updateOrderMutation
    };