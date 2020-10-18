import React, { Component } from "react";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import {updateObject,checkValidity} from '../../../shared/utility'


import {connect} from 'react-redux'

class ContactData extends Component {
  state = {
    orderForm: {
      name:{
        elementType:'input',
        elementConfig:{
            type:'text',
            placeholder:'Your Name'
        },
        value:'',
        validation:{
            required:true,
            minLength:1,
            maxLength:30
        },
        valid:false,
        touched:false
      },
      street: {
        elementType:'input',
        elementConfig:{
            type:'text',
            placeholder:'Street'
        },
        value:'',
        validation:{
            required:true,
            minLength:1,
            maxLength:30
        },
        valid:false,
        touched:false
      },
      zipCode: {
        elementType:'input',
        elementConfig:{
            type:'text',
            placeholder:'ZIP Code'
        },
        value:'',
        validation:{
            required:true,
            minLength:1,
            maxLength:30
        },
        valid:false,
        touched:false
      },
      country: {
        elementType:'input',
        elementConfig:{
            type:'text',
            placeholder:'Country'
        },
        value:'',
        validation:{
            required:true,
            minLength:1,
            maxLength:30
        },
        valid:false,
        touched:false
      },
      email: {
        elementType:'input',
        elementConfig:{
            type:'email',
            placeholder:'Your E-Mail'
        },
        value:'',
        validation:{
            required:true,
            minLength:1,
            maxLength:30
        },
        valid:false,
        touched:false
      },
      deliveryMethod: {
        elementType:'select',
        elementConfig:{
          options:[
              {value:'fastest',displayValue:'Fastest'},
              {value:'cheapest',displayValue:'Cheapest'},
            ]
        },
        value:'fastest',
        validation:{},
        valid:true
      },
    },
    formValid:false
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for(let formelement in this.state.orderForm){
        formData[formelement] = this.state.orderForm[formelement].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData:formData,
      userId:this.props.userId
    };
    this.props.onOrderBurger(order,this.props.token)
    
  };

  inputChangeHandler = (event,inputIndentifier) =>{
   
  const updatedFormElement = updateObject(this.state.orderForm[inputIndentifier],{
        value:event.target.value,
        valid:checkValidity(event.target.value,this.state.orderForm[inputIndentifier].validation),
        touched:true
    }) 

    const updatedForm = updateObject(this.state.orderForm,{
      [inputIndentifier]:updatedFormElement
    })
    updatedForm[inputIndentifier] = updatedFormElement


    let formValid = true
    for(let inputIndentifier in updatedForm){
      formValid = updatedForm[inputIndentifier].valid && formValid
    }

    

    this.setState({orderForm:updatedForm,formValid:formValid})
  }


  render() {
   
    let FormElemtnArray = [];
    
    for(let key in this.state.orderForm){
        FormElemtnArray.push({
            id:key,
            config:this.state.orderForm[key]
        })
    }

    
   
    let form = (
      <form action="" onSubmit={this.orderHandler}>
        {FormElemtnArray.map(formElement =>{
            return  <Input 
            key = {formElement.id}
            elementType={formElement.config.elementType}
            elementConfig ={formElement.config.elementConfig}
            value = {formElement.config.value}
            change={(event) => this.inputChangeHandler(event,formElement.id)}
            invalid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            />
        })}
        <Button btnType="Success" disabled = {!this.state.formValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onOrderBurger:(orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
  }

}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,Axios));
