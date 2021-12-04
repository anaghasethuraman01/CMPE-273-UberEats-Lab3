import React, {Component} from 'react';
import {Card, ListGroup, ListGroupItem,Modal} from 'react-bootstrap';
// import cookie from 'react-cookies';
import { Button ,Input} from 'reactstrap';
import axios from 'axios';
import backendServer from "../../webConfig";

import {BiDish} from 'react-icons/bi';

//import 'bootstrap/dist/css/bootstrap.css';
class RestaurantHome extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          restaurantid : localStorage.getItem("restaurantid"),
          restaurantname: localStorage.getItem("restaurantname"),
          zipcode:localStorage.getItem("zipcode"),
          description:localStorage.getItem("description"),
          email:localStorage.getItem("email"),
          phone: localStorage.getItem("phone"),
          timing:localStorage.getItem("timing"),
          city:localStorage.getItem("city"),
          deliverytype: localStorage.getItem("deliverytype"),
          days:localStorage.getItem("days"),
          loading: false,
          output: null,
          restaurantdishes:[],
          statusmsg:null,
          show:false,
          selectedDish:[]
        }
      }
  
      addnewdish = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/addrestaurantmenu'); 
      }
      componentDidMount(){
        const data = {
          restaurantid : this.state.restaurantid
        }
        //this.props.restaurantHome(data);
          //axios.defaults.headers.common.authorization = localStorage.getItem('token');
         axios.post(`${backendServer}/getrestaurantwithid`,data).then((response) => {
          //  console.log(response.data.length)
           if(response.data.length > 0){
             this.setState({
               statusmsg: "dishesfound"
             })
           }
           this.setState({
          restaurantdishes: this.state.restaurantdishes.concat(response.data),
            });   
          
         })

      }

    //  
      editdish = (dishObj) => {
        localStorage.setItem("SelectedDish",JSON.stringify(dishObj));
        const {history} = this.props;
        history.push('/editdishpage'); 
      }
    render(){
      
      var disheslist = null;
      //  if(this.state.statusmsg == "dishesfound"){
        
        disheslist = (
        <div className='card-list'>
        {this.state.restaurantdishes.map(dish=>
        
          <div >
          <Card style={{ width: "18rem" }}>
          <Card.Img style={{ width: "18rem",height:"13rem" }} variant="top" src={`${backendServer}${dish.profilepic}`} />
          <Card.Body>
          <Card.Title>{dish.dishname}</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem> ${dish.price} </ListGroupItem>
            <ListGroupItem> {dish.category}</ListGroupItem>
          </ListGroup> 
          <Button
          onClick={() => {
            this.editdish(dish);
            }}>Edit Dish
            </Button>
          </Card.Body> 
          </Card>                           
        </div>
        
        )
      }
      </div>
        )
      //  }else{
      //   disheslist = (
      //     <div><h3>Add a dish</h3></div>
      //   )
      //  }

    return (
      
        <div className="container">
            
            <form>
            <h1>Hi {this.state.restaurantname} !</h1>
            <div className="resthome">
            <h6>Email : {this.state.email}</h6>
            <h6>Location : {this.state.city}</h6>
            </div>
            <Button onClick = {this.addnewdish}>New Dish <BiDish/></Button>
            <div className='form-buttons'>
            </div>
            {disheslist}
            </form>
           
        </div>
        
    )
    }
   
}
// RestaurantHome.propTypes = {
// 	restaurantHome: PropTypes.func.isRequired,
// 	resthome: PropTypes.object.isRequired,
//   };
  
//   const mapStateToProps = (state) => {
// 	return {
// 		resthome: state.resthome.resthome
// 	};
//   };
  
// export default connect(mapStateToProps, {restaurantHome})(RestaurantHome);
 export default RestaurantHome;