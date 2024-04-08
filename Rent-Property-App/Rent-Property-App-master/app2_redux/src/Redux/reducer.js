import * as types from './actionTypes'

const initalstate ={
    rent:[]
}

export const reducer=(oldstate = initalstate, {payload,type})=>{

    switch (type){

        case types.GET_DATA:
            return{
                ...oldstate,
                rent:payload
            }
            default:
                return oldstate;
            
    }
}