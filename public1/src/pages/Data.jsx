import { Box, Heading, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "./data.css"
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { filterProduct, getUser } from "../Redux/AppReducer/action";
import { NavBar } from "../components/NavBar";
const Data = () => {
  const dispatch = useDispatch();

  // const [filterData,setFilterData] = useState([])
  
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const data = useSelector((state) => state.AppReducer.user);
const filterData = useSelector((state) => state.AppReducer.filterData);

console.log(filterData)
  // const HandlefilterChange =(e)=>{

  // console.log(e.target.value)

  // let filterData = data.filter((elem)=>elem.country==e.target.value)
  // console.log(filterData)

  // dispatch(getUser(filterData))
  // // setFilterData(filterData)
  // // data = filterData
  // }

  function HandlefilterChange(e) {
    let filteredData = data.filter((el) => {
      return el.category === e.target.value;
    });

    
    dispatch(filterProduct(filteredData));
  }
  console.log(data);

  console.log()
  return (
    <Box mt={10}>
    <NavBar/>
      <Heading as={"h1"} mb={30}>Data</Heading>


      <Select onChange={HandlefilterChange} width={"300px"} placeholder='Select option'>
  <option value='India'>India</option>
  <option value='Pakistan'>Pakistan</option>
  <option value='America'>America</option>
</Select>

      <Box  id="data">
        {data?.map((elem) => {
          return (
            <Box id="data1">
              <Text>Name : {elem.name}</Text>
              <Text>Age : {elem.age}</Text>
              <Text>Gender : {elem.gender}</Text>
              <Text>profession : {elem.profession}</Text>
              <Text>Country : {elem.country}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Data;

