import React, {Component} from 'react';
import { Button } from 'reactstrap';
import {Card, ListGroup, ListGroupItem,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import backendServer from "../../webConfig";
import {BiCartAlt} from 'react-icons/bi';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { restaurantHome } from "../../actions/restaurantHomeActions";
import { graphql } from 'react-apollo';
import { addToCartMutation } from "../../mutation/mutations";
import { getRestaurantMenuQuery } from "../../queries/queries";
import { compose } from 'redux';

class SingleRestDashboard extends Component {
    
    constructor(props){
        super(props);
  
        this.state = {
          
          restaurantname:localStorage.getItem("restaurantname"),
          restaurantid : localStorage.getItem("restaurantid"),
          //restaurantname:null,
          description:null,
          //restaurantname:null,
          query : null,
          dish:null,
          status:"notdone",
          dishes :[],
          restaurants:[],
          message:null,
          newrestid:null,
          customerid : null,
          dishid:null,
          dishname:null,
          dishprice:null,
          quantity:1,
          deliverytype:null,
          quantityprice:null,
          show:false,
          showfav:false,
          
        }
      
      }
      handleModalClose(){
        this.setState({show:!this.state.show}) 
        const {history} = this.props;
        history.push('/singlerestdashboard'); 
    }

    handleModalCloseFav(){
      this.setState({showfav:!this.state.showfav}) 
      // const {history} = this.props;
      // history.push('/singlerestdashboard'); 
  }
      componentDidMount(){
        const restaurantid = {
          restaurantid: localStorage.getItem("restaurantid")
      };
      this.getDishes();
      //this.props.restaurantHome(restaurantid);
      // axios.defaults.headers.common.authorization = localStorage.getItem('token');
      //   axios.post(`${backendServer}/getrestaurantwithid`,restaurantid)
      //           .then((response) => { 
      //             console.log(response.data)
      //           //update the state with the response data
      //           this.setState({
      //             dishes : this.state.dishes.concat(response.data) 
      //           });
      //          //console.log(this.state.dishes);
      //       });
            
            // const userid = localStorage.getItem("restaurantid")
            // console.log(userid)
            // const restid = {
            //   userid: localStorage.getItem("restaurantid")
            // };
           
            // axios.post(`${backendServer}/getrestaurantprofile`,restid)
            // .then((response) => { 
            //   console.log("****")
            //   console.log(response)
            //   console.log("****")
            // this.setState({
            //   restaurants : this.state.restaurants.concat(response.data) 
            // });
           
        //     this.setState({
        //       restaurantname : response.data[0].username
        //     });
        //     this.setState({
        //       deliverytype : response.data[0].deliverytype
        //     });
        //     localStorage.setItem("DeliveryType",this.state.deliverytype);
            
        // });    

    }

    getDishes = () => {
      if (this.props.data && this.props.data.menu && !this.state.restaurantMenu) {
          console.log("I got called");
           this.setState({ 
            dishes: this.props.data.menu,
          });
      }        
  };
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.resthome) {
  //         var { resthome } = nextProps;
  // }
  
  // this.setState({
  //   dishes: this.state.dishes.concat(resthome)
  // });
  // // console.log(typeof(favourite))
  
  // }
  handleCheckout(){
      //console.log(this.props);
      const {history} = this.props;
		  history.push("/checkout");
   }
      goback = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/restdashboard'); 
      }

      gobackFav = (e) =>{
        e.preventDefault();
        const {history} = this.props;
        history.push('/favourites'); 
      }
    
     addtocart =async (restid,dishid,dishname,dishprice) =>{
      
        let mutationResponse = await this.props.addToCartMutation({
          variables: {
            customerid : localStorage.getItem("userid"),
            deliverytype :"Delivery",
            restaurantid : restid,
            dishid:dishid,
            dishname:dishname,
            dishprice:dishprice,
            quantity:this.state.quantity,
            quantityprice :(dishprice * this.state.quantity) 
          }
      });
      let response = mutationResponse.data.addCart;
      console.log("response")
      console.log(response)
      console.log("response")
        // if (this.validateDish() === true){
        //   const dishData = {
        //       restaurantid:localStorage.getItem("restaurantid"),
        //       dishname:this.state.dishname,
        //       ingrediants:this.state.ingrediants,
        //       price:this.state.price,
        //       description:this.state.description,
        //       category:this.state.category,
        //       foodtype:this.state.foodtype
        //   }
        //   this.sendDishAPI(dishData);
        //   this.setState({
        //     show : true 
        //   });
        // }
        
      
      //  const cartvalue = {
      //    customerid : localStorage.getItem("userid"),
      //    deliverytype :localStorage.getItem("deliverytype"),
      //    restaurantid : restid,
      //    dishid:dishid,
      //    dishname:dishname,
      //    dishprice:dishprice,
      //    quantity:this.state.quantity,
      //    quantityprice :(dishprice * this.state.quantity) 
      //   }
        
          // localStorage.setItem("dishid",dishid);
          // localStorage.setItem("dishname",dishname);
          // localStorage.setItem("dishprice",dishprice);
          // localStorage.setItem("quantity",cartvalue.quantity);
          // localStorage.setItem("quantityprice",cartvalue.quantityprice);
      
      // this.addToCart(cartvalue);
      //  this.setState({
      //   show : true 
      // });
     }
        handleModalClose(){
        this.setState({show:!this.state.show}) 
         }
  //   addToCart = (data) => {
  //     console.log("add to cart")
      
  //     // axios.defaults.headers.common["authorization"] = localStorage.getItem(
  //     //   "token");
  //     axios.defaults.withCredentials = true;
  //     axios.post(`${backendServer}/addtocarttable`, data).then((res) => {
  //       console.log("res.data")
  //       console.log(res.data)
  //         if(res.data === "Delete previous order"){
  //           this.setState({show:"true"})
  //         }
  //         if(res.data === "Quantity updated"){
  //           this.setState({showfav:"true"})
  //         }
        
  //         // console.log("Status Code : ", res.status);
  //         // if (res.status === 200) {
  //         //   this.setState({ authFlag: true });
  //         // } else {
  //         //   this.setState({ authFlag: false });
  //         // }
  //     });
	// };
  handleNewOrder = () => {
    const data = {
        customerid : localStorage.getItem("userid"),
         restaurantid : localStorage.getItem("restaurantid"),
         dishid:localStorage.getItem("dishid"),
         dishname:localStorage.getItem("dishname"),
         dishprice:localStorage.getItem("dishprice"), 
         quantity:localStorage.getItem("quantity"),
         quantityprice:localStorage.getItem("quantityprice"),
         deliverytype :localStorage.getItem("deliverytype")
    }
    console.log(data)
    //localStorage.setItem("restname",this.state.restaurantname);
    // axios.defaults.headers.common["authorization"] = localStorage.getItem(
    //   "token");
      axios.defaults.withCredentials = true;
      axios.post(`${backendServer}/handleneworder`, data).then((res) => {
        
          // if (res.status === 200) {
          //   this.setState({ authFlag: true });
          // } else {
          //   this.setState({ authFlag: false });
          // }
      });
      this.setState({show:!this.state.show}) 
	};
    render(){
      
      var restaurantdetails = null;
        var searchresults = null;
      var messagebox = null;
        searchresults = 
        <div className='card-list'>
        {this.state.dishes.map(dish=>
         <div>
          <Card style={{ width: '18rem' }}>
          <Card.Img style={{ width: '18rem',height:'13rem' }} variant="top" src={`${backendServer}${dish.profilepic}`} />
          <Card.Body>
          <Card.Title>{dish.dishname}</Card.Title>
          </Card.Body>
          
          <ListGroup className="list-group-flush">
            <ListGroupItem>Contains : {dish.ingrediants} </ListGroupItem>
            <ListGroupItem>Price :  $ {dish.price}</ListGroupItem>
           	<ReactTooltip />
            <Button className="cardbtn2" data-tip="Add To Cart"
            onClick={() => {
												this.addtocart(this.state.restaurantid,dish._id,dish.dishname,dish.price);
											}}>
              <BiCartAlt/></Button>
          </ListGroup>
          </Card>                           
          </div>
       
       )
       }

     </div>
        
        restaurantdetails = 
        <div>
        {this.state.restaurants.map(restaurant=>
        <div>
        
        <img className="restimage" src={`${backendServer}${restaurant.profilepic}`} ></img>
        <br/>
        <br/>
        <h6>{restaurant.description}</h6>
        </div>

       )
       }
        </div>
   
    return (
      
        <div class="container">
          
            <h1>{this.state.restaurantname}</h1>
            
          {/* {messagebox} */}
            {restaurantdetails}
            {/* <form>
            <Button onClick = {this.goback}>Search Restaurants</Button>
            <Button onClick = {this.gobackFav}>Favourites</Button>
            </form> */}
            <Row></Row>
            <hr/>
            <Row>
            {searchresults}
            </Row>
            <div>
            <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.show} onHide={()=>this.handleModalClose()} >
             <Modal.Header closeButton>Create New Order</Modal.Header>
             <Modal.Body>
             Your Order contain items from another restaurant.Create a new
             order to add items from {this.state.restaurantname}
             </Modal.Body>
             <Modal.Footer>
               <Button 
               onClick={() => {
												this.handleNewOrder();
											}}>
              New Order</Button>
             </Modal.Footer>
           </Modal>
           </div>


           <div>
            <Modal size="md-down"
          aria-labelledby="contained-modal-title-vcenter"
          centered
           show={this.state.showfav} onHide={()=>this.handleModalCloseFav()} >
             <Modal.Header closeButton></Modal.Header>
             <Modal.Body>
             Item added to cart!
             </Modal.Body>
             
           </Modal>
           </div>

        </div>
    )
    }
   
}
 

// SingleRestDashboard.propTypes = {
// 	restaurantHome: PropTypes.func.isRequired,
// 	resthome: PropTypes.object.isRequired,
//   };
  
//   const mapStateToProps = (state) => {
// 	return {
// 		resthome: state.resthome.resthome
// 	};
//   };
export default compose(
graphql(getRestaurantMenuQuery, {
    name: "data",
    options: { variables: { restaurantid: localStorage.getItem("restaurantid") }
    }
}),
graphql(addToCartMutation, { name: "addToCartMutation" }))(SingleRestDashboard);

//export default connect(mapStateToProps, {restaurantHome})(SingleRestDashboard);
//export default SingleRestDashboard;