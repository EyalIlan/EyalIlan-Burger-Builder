import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';


const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className={classes.Summary}>
                <Burger  ingredients={props.ingredients} />
            </div>
            
            <div className={classes.buttonPosition}>
            <Button  
                btnType="Danger"
                clicked = {props.checkoutCancelled}>CANCEL</Button>
            <Button 
                btnType="Success"
                clicked = {props.checkoutContinued}>CONTINUE</Button>

            </div>
            
        </div>
    );
}

export default checkoutSummary;