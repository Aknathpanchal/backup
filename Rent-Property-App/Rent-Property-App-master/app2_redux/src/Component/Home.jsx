import React, { useEffect, useState } from 'react'
import Styles from './Style/Home.module.css'
import { Navbar } from './Navbar'
import axios from 'axios'
import heartRed from "./Icons/heart.png"
import heartBlack from './Icons/love.png'
import { getData, getDataFun } from '../Redux/action'
import { useDispatch, useSelector } from 'react-redux'

export const Home = () => {

  let dispatch = useDispatch()
  const [data, setData] = useState([])
  var dataStore = useSelector((store)=> store.reducer.rent)
  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')
  const [minprice, setMinPrice] = useState()
  const [maxprice, setMaxPrice] = useState()
  const [data11, setData11] = useState([])
  const [data22, setData22] = useState([])
  let tempData;
  console.log("data1111Store",dataStore)

  // const getData = ()=>{
  //    axios.get(`https://jsonserver-her-mock5.herokuapp.com/rent_property?q=${search}`)
  //   .then((res)=> setData(res.data))
  // }
  useEffect(()=>{
   setData(dataStore)
  },[dataStore])
  console.log("DATA",data)

  useEffect(()=>{
     dispatch(getDataFun(search))
  },[search])
  // console.log(data)
  
  // Type of City Filter Function--------------->
  const handleCity=(e)=>{
    let val = e.target.value
    console.log(data)    
    tempData = data.filter((el)=> el.city == val )

  }

  // Date Filter Function------------------>
  const handleDate=(e)=>{
    let val = e.target.value
    setDate(e.target.value)
    let ddd=[]
    console.log(tempData)
    if(tempData ){
      tempData.map((el)=> {
        let dd = new Date(val) - new Date(el.date)
        // console.log(dd)
        if(dd >= 0){
          // console.log(el)
          ddd.push(el)
        }
      })
    }
    else{
      data.map((el)=> {
        let dd = new Date(val) - new Date(el.date)
        // console.log(dd)
        if(dd >= 0){
          // console.log(el)
          ddd.push(el)
        }
      })
    }
    console.log("ddd",ddd)
    setData11(ddd)
  }
  console.log("Data11",data11)
  
  // Property Type Filter Function-------------->
  const handlePropertyType=(e)=>{
    let val = e.target.value
    console.log("11",data11)
    let pro = data11.filter((el)=> el.propertyType == val)
    // console.log(pro)
    setData22(pro)
  }
  console.log("Data22",data22)

  // Min and Max Price Filter Function------------>
  const handleFilter=()=>{
    // console.log(maxprice)
   let price = []
    data22.map((el)=>{
      if(el.rent > minprice && el.rent < maxprice){
        // console.log(el)
        price.push(el)
      }
    })
  //  setData(price)
  console.log("Price",price)
  dispatch(getData(price))
  }
  
  const handleFavourite =(el)=>{
    // console.log(el)
    axios.post(`https://jsonserver-her-mock5.herokuapp.com/wishlist/`,el)
  }
  

  return (
    <div style={{backgroundColor:"rgb(244, 249, 249)"}}>

      <Navbar/>

      <div className={Styles.SearchDiv}>
        <h1>Search Properties By rent</h1>
        <input type="text" placeholder="Search Property... " onChange={(e)=> setSearch(e.target.value)}/>
      </div>
      <div className={Styles.filterDiv}>
        <select className={Styles.selectTag} placeholder='Select State' onChange={handleCity}>
            <option value={null}>Select City</option>
            <option value='Pune'>Pune</option>
            <option value='Delhi'>Delhi</option>
            <option value='Mumbai'>Mumbai</option>
        </select>
       
        <div className={Styles.dateDiv}>
            {
              date.length > 0 ? date : "Select Move-in-Date"
            } 
            <input type="date" data-date="" data-date-format="DD MMMM YYYY" onChange={handleDate}   min={Date.now()} max="2023-01-28" required/>
        </div>
        <select className={Styles.selectTag} placeholder='Select State' id="" onChange={handlePropertyType}>
            <option value={null}>Property Type</option>
            <option value="Independent House">Independent House</option>
            <option value="Apartment">Apartment</option>
            <option value="Builder Floor">Builder Floor</option>
        </select>
        <div className={Styles.priceDiv}>
            <p>Price Range</p>
            <input type="number" id="" placeholder="Min" onChange={(e)=>setMinPrice(e.target.value)} required />
            <input type="number" placeholder="Max" onChange={(e)=> setMaxPrice(e.target.value)} required/>
        </div>

        <button className={Styles.filterButton} onClick={handleFilter}>Search</button>
      </div>
      
      <div>
        {
          data.length > 0 ?
          <div className={Styles.mapDiv} >
             {
                  data?.map((el)=>(
                    // console.log(el.id)
                    <div key={el.id} className={Styles.fristDiv}>
                       <div>
                           <img style={{width:"100%",height:"200px"}} src={el.image} alt={el.image} />
                       </div>
                       <div style={{padding:"0px 20px"}}>
                           <div className={Styles.second}>
                              <div className={Styles.third}>
                                <div style={{display:"flex",marginTop:"-15px"}}>
                                  <h3 style={{color:"#362aba",fontWeight:800}}>₹{el.rent} /</h3><h4 style={{marginTop:"21px"}}>month</h4>
                                </div>
                                <img style={{width:"25px",height:"25px",cursor:"pointer"}} src={heartBlack} alt="" onClick={()=>handleFavourite(el)} />
                              </div>
                           </div>
                           <div className={Styles.fourth}>
                              <h2 style={{color:"red",marginTop:"15px"}}>{el.houseName}</h2>
                           </div>
                           <div className={Styles.fourth}>
                              <h3 style={{color:"green"}}>{el.propertyType}</h3>
                           </div>
                           <div className={Styles.fourth}>
                              <h4 >{el.address}</h4>
                           </div>
                           <div className={Styles.fifth}>
                              <div>
                                 <img style={{height:"17px"}} src="https://img.icons8.com/ios-filled/20/null/bedroom.png"/>
                                 <h4 style={{marginTop:"2px"}}>{el.noBedroom} Bedrooms</h4>
                              </div>
                              <div>
                                 <img style={{height:"19px",marginTop:"2px"}} src="https://img.icons8.com/material-rounded/20/null/aspect-ratio.png"/>
                                 <h4 style={{marginTop:"2px"}}>{el.areaOfHouse} sq.ft. Area</h4>
                              </div>
                           </div>
                       </div>
                    </div>
                  ))
                 }
          </div>
          :
          <div style={{paddingBottom:"50px"}}>
               <h1>Data Not Found</h1>
               <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=450" alt="dataNotFoundImg"/>
          </div>
        }
      </div> 
    </div>
  )
}

