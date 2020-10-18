
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import {updateObject,checkValidity} from '../../shared/utility'
import * as actions from '../../store/actions/index'


 class Auth extends Component {
    
    state ={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Mail Address'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true,
                },
                valid:false,
                touched:false
              },
              password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
              },
            },
            isSignup:true
       }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }   

    
    
    inputChangeHandler = (event,controlName) =>{
        const updateControls =  updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                 value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        })
        this.setState({controls:updateControls})
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState =>{
           return {isSignup:!prevState.isSignup}
        })
    }


    submitHandler = (event) =>{
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    render() {

        let FormElemtnArray = [];
    
        for(let key in this.state.controls){
            FormElemtnArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form = FormElemtnArray.map(formElement =>{
            return <Input key = {formElement.id} 
            elementType={formElement.config.elementType}
            elementConfig ={formElement.config.elementConfig}
            value = {formElement.config.value}
            change={(event) => this.inputChangeHandler(event,formElement.id)}
            invalid = {!formElement.config.valid}
            shouldValidate = {formElement.config.validation}
            touched = {formElement.config.touched}
            />
        })

        if(this.props.loading){
            form = <Spinner />
        }


        let authRedirct = null
        if(this.props.isAuthenticated){
            authRedirct = <Redirect to={this.props.authRedirectPath}/>
        }

        let errorMessage = null
        if(this.props.error){
        errorMessage = (
            <p>{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth}>
                {authRedirct}
                {errorMessage}
               <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType ="Success" > SUBMIT</Button>
                </form> 
             <Button btnType = "Danger" clicked={this.switchAuthModeHandler}>Switch to {this.state.isSignup ? 'SIGNIN':'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth:(email,password,isSignup) => dispatch(actions.auth(email,password,isSignup)),
        onSetAuthRedirectPath:() =>dispatch(actions.setAuthRedirectPath())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);