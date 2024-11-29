import React, { useState, useEffect } from "react";
import { AppBar, Box, Container } from "@mui/material";
import QuestionStep from './QuestionStep';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // Fix the default import for jwt-decode

function Questionnaire() {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    ageRange: "",
    gender: "",
  });
  const [userId, setUserId] = useState(""); // Store userId separately
  const navigate = useNavigate(); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const authDetails = localStorage.getItem("authDetails");
    if (authDetails) {
      const parsedAuthDetails = JSON.parse(authDetails);
      const token = parsedAuthDetails?.token;

      if (token) {
        try {
          const decoded = jwtDecode(token);
          const userId = decoded.id;
          setUserId(userId); // Store userId in the state
          console.log("Decoded token:", decoded); 
        } catch (error) {
          // If token is invalid or expired
          console.error("Token is invalid or expired:", error);
          navigate('/login'); // Navigate to login page
        }
      } else {
        // If token is missing
        navigate('/login'); // Navigate to login page
      }
    } else {
      // If authDetails is missing
      navigate('/login'); // Navigate to login page
    }
  }, [navigate]); // Add navigate as a dependency to useEffect

  const handleUpdate = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);

  useEffect(() => {
    if (isSubmitting) {
      submitUserData();
    }
  }, [isSubmitting]);

  const submitUserData = async () => {
    console.log(userData);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userData, userId }), // Include userId in the request payload
      });

      if (response.ok) {
        navigate('/chatbot');
      } else {
        console.error('Failed to submit user data');
      }
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  return (
    <Box sx={{ background: "#08404d", minHeight: "100vh", display: "flex", flexDirection: "column"}}>
      <AppBar position="absolute" sx={{ backgroundColor: "white", color: "black", top: 0 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{ display: { xs: "none", lg: "block" } }}
            >
              <img src="/assets/mannmuktt logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
            </Box>
            <Box
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{ display: { xs: "block", lg: "none" } }}
            >
              <img src="/assets/mannmuktt logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
            </Box>
          </Box>
        </Container>
      </AppBar>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end', // This ensures content sticks to the bottom
        minHeight: '100vh'
      }}>
        <Box sx={{ width: {xs: "100%", sm:"80%", md:"50%", lg: "50%"}}}>
          {step === 1 && (
            <QuestionStep
              greeting="Hi!" 
              question="What name would you like to use?"
              description="Rest assured, our conversations are completely private."
              inputType="text"
              value={userData.name}
              onContinue={(name) => {
                handleUpdate("name", name);
                nextStep();
              }}
            />
          )}

          {step === 2 && (
            <QuestionStep
              question={`${userData.name}, how old are you?`}
              description="We would like to help you by providing appropriate support based on your age."
              inputType="radio"
              options={["10-20", "20-30", "30-40", "40+"]}
              value={userData.ageRange}
              onContinue={(ageRange) => {
                handleUpdate("ageRange", ageRange);
                nextStep();
              }}
            />
          )}

          {step === 3 && (
            <QuestionStep
              question="What is your gender?"
              description="We would like to help you by providing appropriate support based on your gender."
              inputType="radio"
              options={["Male", "Female", "Prefer Not to Say"]}
              value={userData.gender}
              onContinue={(gender) => {
                handleUpdate("gender", gender);
                setIsSubmitting(true); // Trigger submission in useEffect
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Questionnaire;
