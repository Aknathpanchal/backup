import axios from "axios"
import { FILTER_DATA, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, POST_USER_FAILURE, POST_USER_REQUEST, POST_USER_SUCCESS } from "./actionType"



export const getUser = (payload) => (dispatch) => {
    dispatch({type : GET_USER_REQUEST})
    return axios
    .get("https://render-mock-api.onrender.com/user",payload)
    .then((res) => {
        dispatch({type : GET_USER_SUCCESS , payload : res.data})
    })
    .catch((err) => {
        dispatch({type : GET_USER_FAILURE})
    })
}


export const filterProduct = (data) => {
    return {
      type: FILTER_DATA,
      payload: data,
    };
  };

export const PostUser = (obj) => (dispatch) => {
    dispatch({type : POST_USER_REQUEST})
    return axios
    .post("https://render-mock-api.onrender.com/user",obj)
    .then((res) => {
        dispatch({type : POST_USER_SUCCESS , payload : res})
    })
    .catch((err) => {
        dispatch({type : POST_USER_FAILURE})
    })
}

