    import { Box, Button, Heading, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
    import { useDispatch } from 'react-redux';
    import {useNavigate } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
    import { login } from '../Redux/AuthReducer/action';
    import { GET_LOGIN_SUCCESS } from '../Redux/AuthReducer/actionType';

    export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(email,password);
        if(email && password) {
        dispatch(login({email, password})).then((r) => {
            console.log(r);
            if(r.type === GET_LOGIN_SUCCESS) {
                alert("login successful")
                navigate("/data")
            }else {
                alert("login failed")
            }
        })
        }
    }

    return (
        <Box width={"40%"} margin={"auto"}>
        <NavBar/>
          <Heading >Login Page</Heading>
          <br />
        <form onSubmit={handleOnSubmit}>
          
            <br />
         
            <Box>
            <label>Email</label>
            <br/>
            <Input type="emil" placeholder="Enter your Password"
            value={email} onChange={(e) => setEmail(e.target.value)} />
            </Box>
            <br />
 
            <Box>
            <label>Password</label><br/>
            <Input type="password" placeholder="Enter your Password"
            value={password} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <br />
           
            <Button type="submit">Login</Button>
        </form>
        </Box>
    )
    }
