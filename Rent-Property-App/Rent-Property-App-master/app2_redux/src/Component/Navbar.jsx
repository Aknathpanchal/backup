import React from 'react'
import Styles from './Style/Navbar.module.css'
import estateryicon from './Icons/estatery-icon.PNG'
import { NavLink, useNavigate } from 'react-router-dom'

export const Navbar = () => {
  let navigate = useNavigate()
  const handleIcon=()=>{
    navigate("/")
  }
  return (
    <div>
       <div className={Styles.Navbar}>
        <div className={Styles.div1} >
            <div onClick={handleIcon}> <img style={{width:"140px",height:"37px",marginTop:"-5px",marginRight:"20px"}} src={estateryicon} alt="logoimage"/></div>

            <NavLink className={Styles.navlink} to="/">Rent</NavLink>
            <NavLink className={Styles.navlink} to="/favourite" >Favourite property</NavLink>
            <NavLink className={Styles.navlink} to="/PostProperty" >Post property</NavLink>
        
        </div>

      </div>
    </div>
  )
}

