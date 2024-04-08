import { GET_LOGIN_FAILURE, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS } from "./actionType";

    const initialState = {
        isAuth : JSON.parse(localStorage.getItem("key")) || false,
        single_user : {},
        isLoading : false,
        isError : false
    }

 const reducer = (state= initialState , { type, payload}) => {
     switch(type) {
         case GET_LOGIN_REQUEST :
             return {
                ...state,
                isLoading : true,
             }
        case GET_LOGIN_SUCCESS :
            let newKey = true;
            localStorage.setItem("key", JSON.stringify(newKey))
            return {
                ...state,
                isAuth : newKey,
                isError : false,
                isLoading : false,
            }
        case GET_LOGIN_FAILURE :
            return {
                ...state,
                isAuth : false,
                isError : true,
                token : "",
                isLoading : false
            }
        default :
         return state;
     }
 } 


 export { reducer }