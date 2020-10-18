import * as actionTypes from './actionTypes'
import Axios from '../../axios-orders'

export const addIngridient = (name) =>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient = (name) =>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}


const fetchIngredientsFailed = ()=>{
    return{
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredients) =>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        Axios.get('/ingredients.json')
        .then(res =>{
            dispatch(setIngredients(res.data))  
        }).catch(err=>{
            dispatch(fetchIngredientsFailed())
        })
    }
}

