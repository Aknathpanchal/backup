import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const naviagtion = useNavigate()
    const handleAdmin = () => {
      console.log("admin")
      return naviagtion("/admin")
    }
  
    const handleUser = () => {
     return  naviagtion("/user")
    }
  return (
    <div>
     

            <Box>
        <Button onClick={handleAdmin}>Admin section</Button>
        <Button onClick={handleUser}>User section</Button>
      </Box>
    </div>
  )
}

export default Home
