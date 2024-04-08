import * as types from './actionTypes'
import axios from 'axios'

export const getData=(payload)=>{
    return{
        type: types.GET_DATA,
        payload
    }
}

export const getDataFun=(search)=>(dispatch)=>{
    axios.get(`https://jsonserver-her-mock5.herokuapp.com/rent_property?q=${search}`)
    .then((res)=> dispatch(getData(res.data)))
}