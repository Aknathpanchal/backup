import { FILTER_DATA, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS } from "./actionType"

const initiaStat = {
    user : [],
    isLoading : false,
    isError : false,
    filterData: []
}


export const reducer = (state = initiaStat, {type , payload}) => {
    switch(type){
        case GET_USER_REQUEST : 
         return {
            isLoading : true,
            isError : false
         }
        case GET_USER_SUCCESS : 
         return {
            isLoading : false,
            isError : false,
            user : payload
         } 
        case GET_USER_FAILURE : 
         return {
            isLoading : false,
            isError : true
         }

     
            case FILTER_DATA:
               return { ...state, filteredData: payload }
        default :
         return state;
    }
}