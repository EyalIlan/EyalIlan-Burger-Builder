import * as actionType from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const intialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath:'/'
};

const authStart = (state,action) =>{
    return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state,action) =>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false
    })
}

const authFail = (state,action) =>{
    return updateObject(state,{
        error:action.error,
        loading:false
    })
}

const authLogOut = (state,action) =>{
    return updateObject(state,{token:null,userId:null})
}

const setAuthRedirectPath = (state,action) =>{
    return updateObject(state,{authRedirectPath:action.path})
}

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:return authStart(state,action)
    case actionType.AUTH_SUCCESS:return authSuccess(state,action)
    case actionType.AUTH_FAIL:return authFail(state,action)
    case actionType.AUTH_LOGOUT:return authLogOut(state,action)
    case actionType.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action)
    default:return state
    }
};

export default reducer;
