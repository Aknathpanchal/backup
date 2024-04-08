import React from 'react'
import { Routes,Route } from 'react-router'
import { PostProperty } from './PostProperty'
import { FavouriteProperty } from './FavouriteProperty'
import { Home } from './Home'

export const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/PostProperty" element={<PostProperty/>}/>
        {/* <Route path="" element={}/> */}
        <Route path="/favourite" element={<FavouriteProperty/>}/> 
        <Route path="*" element={<h2>Page Not Found</h2>}/>
      
    </Routes>
  )
}

