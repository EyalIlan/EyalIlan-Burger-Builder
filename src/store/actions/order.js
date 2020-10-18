import * as actionTypes from './actionTypes'
import Axios from '../../axios-orders'



export const purchaseBurgerSuccess = (id,orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}


export const purchaseBurgerStart = () =>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
       Axios.post("/orders.json?auth="+token,orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name,orderData))
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error))
      });
    }
}

export const purchaseInit = () =>{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) =>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail = (error) =>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrdersStart = () =>{
    return{
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = (token,userId) =>{
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"'
        Axios.get('/orders.json'+queryParams)
        .then(responce =>{
            const fetchOrders = []
            for(let key in responce.data){
                fetchOrders.push({
                    ...responce.data[key],
                    id:key
            })
        
            }
            dispatch(fetchOrdersSuccess(fetchOrders))
           
        }).catch(error =>{
            dispatch(fetchOrdersFail(error))
        })

    }
    
}