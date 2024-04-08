import React, { useState } from 'react'
import Styles from './Style/Home.module.css'
import styles from './Style/PostProperty.module.css'
import { Navbar } from './Navbar'
import axios from 'axios'

export const PostProperty = () => {
  const [proptype, setProType] = useState('')
  const [name, setName] = useState('')
  const [image,setImage] = useState('')
  // const [beds,setBeds] = useState('')
  const [bedroom, setBedroom] = useState('')
  const [city, setCity] = useState('')
  const [date, setDate] = useState('')
  const [area, setArea] = useState('')
  const [rent, setRent] = useState('')
  const [address, setAddress] = useState('')


  var rentArray=JSON.parse(localStorage.getItem("Rent_App_Data"))||[];

  const handelAdd =(e)=>{
    e.preventDefault()
    console.log(proptype,name,bedroom,city,date,area,address)
    // console.log("I am Bhagesh")
    let payload={
      "propertyType":proptype,
      "houseName": name,
      "image":image,
      "noBedroom":bedroom,
      "city":city,
      "date":date,
      "areaOfHouse":area,
      "rent":Number(rent),
      "address":address
    }
    axios.post(`https://jsonserver-her-mock5.herokuapp.com/rent_property`,payload)
    
    // storing the data in Local storage
    rentArray.push(payload)
    localStorage.setItem("Rent_App_Data",JSON.stringify(rentArray))

  }


  return (
    <div >
      {/* <h1 className={Styles.Home}>Add Property Page</h1> */}
      <Navbar/>
      <div className={styles.mainDiv}>
        <div>
          <h1>Rent Your Property on Estatery</h1>
          <img style={{width:"60%"}} src="https://static.99acres.com/universalapp/img/ppfTabImg.png" alt="rentpropertyimg"/>

        </div>
        
        <div className={styles.formDiv}>
           <h2 style={{marginTop:"-5px",marginBottom:"5px"}}>Begin Posting your Property</h2>
           <form onSubmit={handelAdd}>
              <div>
                <select className={styles.ProType}  onChange={(e)=>setProType(e.target.value)} required>
                  <option >Property Type </option>
                  <option value="Independent House">Independent House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Builder Floor">Builder Floor</option>
                </select>
                <input style={{width:"52%"}} type="text" placeholder='House or Apartment name...' onChange={(e)=>setName(e.target.value)} required/>
              </div>
              <input style={{width:"97%"}} type="text" placeholder='Add image of property...' onChange={(e)=>setImage(e.target.value)} required/>

              <select onChange={(e)=> setBedroom(e.target.value)} required>
                <option value="">Number of Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <select onChange={(e)=> setCity(e.target.value)} required>
                  <option value={null}>Select City</option>
                  <option value='Pune'>Pune</option>
                  <option value='Delhi'>Delhi</option>
                  <option value='Mumbai'>Mumbai</option>
              </select>
              <div className={styles.dateMain}>
                  <div className={styles.date}>
                    {
                      date.length <= 0 ? "Availability Date" : date
                    } 
                    <input type="date" onChange={(e)=> setDate(e.target.value)}   min={Date.now()} max="2023-01-28" required/>
                  </div>
                  <input className={styles.area} type="number" placeholder="Bult up Area in square feet... " onChange={(e)=> setArea(e.target.value)} required/>
                  <input style={{width:"125px",marginRight:"7px"}} type="number" placeholder='Rent of Property...' onChange={(e)=> setRent(e.target.value)} />
              </div>
              <input style={{width:"97%"}} type="text" placeholder='Address...' onChange={(e)=> setAddress(e.target.value)} required />
              <button type='submit' className={styles.postButton}>Post your Property</button>

           </form>
        </div>

      </div>
    </div>
  )
}

