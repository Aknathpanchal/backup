import axios from 'axios';
import { GET_LOGIN_FAILURE, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS } from './actionType';

export const login = (data) => (dispatch) => {
    dispatch({type : GET_LOGIN_REQUEST})
    return axios.post("https://reqres.in/api/login" , data)
    .then((res) => {
        console.log("res",res)
        return  dispatch({type : GET_LOGIN_SUCCESS , payload : res})
    })
    .catch((err) => dispatch({type : GET_LOGIN_FAILURE, payload : err}))
}
 




