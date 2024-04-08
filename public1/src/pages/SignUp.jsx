import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { GET_LOGIN_SUCCESS, GET_SIGNIN_SUCCESS } from '../Redux/AuthReducer/actionType';
import { useLocation, useNavigate } from 'react-router-dom';
import { signin, signup } from '../Redux/AuthReducer/action';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Box, Button, Text } from '@chakra-ui/react';

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loaction = useLocation();
  const comingFrom = loaction.state?.from?.pathname || '/'

  const handleOnSubmit =async (e) => {
    e.preventDefault();
    let avtar = "https://i.pravatar.cc/300"
    let id = uuidv4()
    // console.log("signUp",email,password,fullname,avtar)

    let data = await checkingUser();

    if(data){
      console.log('hy')
      alert("Email is already registerd")
      navigate('/login');
    }else {
      console.log("no");
      if(email && password && fullname) {
            dispatch(signup({id,email,fullname, password,avtar})).then((r) => {
              if(r.type === GET_SIGNIN_SUCCESS) {
                navigate('/login');
                console.log("hy");
              }
            })
          }
    } 
  }

  var single_user;
  const checkingUser = () => {
   return axios.get("https://render-mock-api.onrender.com/user")
    .then((res) => {
        let user = res.data
         single_user = user.find((item) =>  item.email == email)
        //  console.log("single_user_action",single_user);
          return single_user
    })
    .catch((err) => console.log(err))
  }
  return (
    <div>
      <h2>SIGN UP PAGE</h2>
      <form onSubmit={handleOnSubmit}>
        <Box mt="20px">
          <label>Full Name &nbsp;</label>
          <input type="text" placeholder="Enter your full name"
          value={fullname} onChange={(e) => setFullName(e.target.value)} />
        </Box>
        <div>
          <label>Email  &nbsp;</label>
          <input type="emil" placeholder="Enter your Password"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label>Password  &nbsp;</label>
          <input type="password" placeholder="Enter your Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button mt="10px" p="5px 20px" type="submit">Sign Up</Button>
      </form>
    </div>
  )
}
