import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin";
import Data from "../pages/Data";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import Reports from "../pages/Reports";
import { User } from "../pages/User";
import ReqAuth from "./ReqAuth";


export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Home/>}/>
        <Route path='/data' element={<Data />}/>
        <Route path='/report' element={<Reports />}/>
        <Route path="*" element={<h2>Page Not Found</h2>}/>
    </Routes>
  );
};
