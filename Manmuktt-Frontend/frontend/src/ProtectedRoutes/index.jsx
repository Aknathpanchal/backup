import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    if (!authDetails?.token) {
      navigate("/login");
    }
  }, [navigate]);
  
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoutes;
