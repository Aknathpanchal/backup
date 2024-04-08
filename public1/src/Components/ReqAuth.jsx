import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router';

const ReqAuth = ({ children }) => {
  const loacation = useLocation();
    const auth = useSelector((store) => store.AuthReducer.isAuth);

    if(!auth) {
        return <Navigate to="/login" state={{from : loacation }}  replace/>
    }

  return children
}

export default ReqAuth