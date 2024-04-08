import React, { useEffect, useState } from 'react'
import Styles from './Style/Home.module.css'
import { Navbar } from './Navbar'
import axios from 'axios'
import heartRed from "./Icons/heart.png"
import heartBlack from './Icons/love.png'

export const FavouriteProperty = () => {
  const [data, setData] = useState([])

  const getData = ()=>{
     axios.get(`https://jsonserver-her-mock5.herokuapp.com/wishlist`)
    .then((res)=> setData(res.data))
  }

  useEffect(()=>{
     getData()
  },[])
  //console.log(data)

  return (
    <div style={{backgroundColor:"rgb(244, 249, 249)"}}>
      <Navbar/>
      <div style={{marginTop:"40px"}}>
        <h1>Favourite Property</h1>
        {
          data?
          <div className={Styles.mapDiv} >
             {
                  data?.map((el)=>(
                    // console.log(el.id)
                    // el.status == true 
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
                                <img style={{width:"25px",height:"25px"}} src={heartRed} alt="" onClick={()=>handleFavourite(el.id)} />
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
          <div>
               <img src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=400" alt="dataNotFoundImg"/>
          </div>
        }
      </div>
    </div>
  )
}

