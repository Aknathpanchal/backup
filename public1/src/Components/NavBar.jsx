import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <Box  display={"flex"} p={['10px 0px','20px 30px']} justifyContent={['space-between', 'initial']}>
      <Box  ml={"5%"}><Link size={{ md : "md", sm : 'sm'}} to="/">Freedom 151</Link></Box>
      <Box ml={['3%', '25%']} display={"flex"} justifyContent={['space-between']}>
        <Box mr={['10px','0px']}   ml={['0px','25px']}>
        <Link to="/login">Login</Link>
          </Box>
        <Box mr={['10px','0px']} ml={['0px','25px']}> 
        <Link to="/data">data</Link>
        </Box>
        <Box mr={['10px','0px']} ml={['0px','25px']}>
        <Link to="/report">report</Link>
          </Box>      
      </Box>
    </Box>
  );
};
