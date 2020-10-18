import React, { Component } from 'react';
import {connect} from 'react-redux'

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import Axios from '../../axios-orders'
import * as Actions from '../../store/actions/index'






class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        purchasing: false
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }


    updatePurchaseState (ingredients) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return  sum > 0
    }

   

    purchaseHandler = () => {
        
        if(this.props.isAuthenticated){
            this.setState({purchasing: true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = null
        
        let burger = this.props.error ? <p>Ingredients cant't be loaded!</p>:<Spinner />
           
        if(this.props.ings){
            orderSummary =  <OrderSummary 
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
            
            
            burger = (
             <Auxiliary>
             <Burger ingredients={this.props.ings} />
             <BuildControls
                ingredientAdded={this.props.onIngredientAdd}
                ingredientRemoved={this.props.onIngredientRemove}
                disabled={disabledInfo}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler}
                isAuth = {this.props.isAuthenticated}
                price={this.props.price} />
             </Auxiliary>
         )
        }

        // {salad: true, meat: false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                  {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdd:(ingName) => dispatch(Actions.addIngridient(ingName)),
        onIngredientRemove:(ingName) => dispatch(Actions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(Actions.initIngredients()),
        onInitPurchase: () =>dispatch(Actions.purchaseInit()),
        onSetAuthRedirectPath:(path) =>dispatch(Actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,Axios));