import { Box, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PostUser } from "../Redux/AppReducer/action";
import { v4 as uuid } from 'uuid';
import Home from "./Home";
import { useNavigate } from "react-router-dom";

export const User = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const[profession,setProfession] = useState("")
 const navigate = useNavigate()
  const handleSubmit = (e) => {

    e.preventDefault()
    let obj = {
      id :uuid(5),
      name: name,
      age: age,
      gender: gender,
      country: country,
      profession:profession
    };
    console.log(obj)

    dispatch(PostUser(obj));
    alert("data posted Successfully")
    navigate("/")
    
  };
  return (
    <Box width={"40%"} margin={"auto"}>

      <form onSubmit={handleSubmit}>
        <Box>
          <Box>Name</Box>
          <Input
            type={"text"}
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box>
          <Box>Age</Box>
          <Input
            type={"number"}
            placeholder="Enter your Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </Box>

        <RadioGroup defaultValue="1">
          <Stack>
            <Radio value="male" onChange={(e)=>setGender(e.target.value)}>Male</Radio>
            <Radio value="female" onChange={(e)=>setGender(e.target.value)}>Female</Radio>
          </Stack>
        </RadioGroup>
        {/* <Box>
          <Box>Gender</Box>
          <Input type={'radio'}  onChange={(e) => setGender(e.target.value)}/> Male
          <Input type={'radio'} onChange={(e) => setGender(e.target.value)}/> Female
        </Box> */}

        <Box>
          <Box>Country</Box>
          <Input
            type={"text"}
            placeholder="Type your Country Name"
            onChange={(e) => setCountry(e.target.value)}
          />
        </Box>

        <Box>
          <Box>Profession</Box>
          <Select onChange={(e)=>setProfession(e.target.value) }>
            <option  value="Student">Student</option>
            <option value="Employed"> Employed</option>
          </Select>
        </Box>
        <br />
        <Box to="/">
          <Input type={"submit"} value="submit" />
        </Box>
      </form>
    </Box>
  );
};
