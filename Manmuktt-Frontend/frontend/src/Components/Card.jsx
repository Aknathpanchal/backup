import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const Card = ({ backgroundImg, heading, buttonText, link }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImg})`,
        width: { xs: "100%", sm: "70%", md: "100%" },
        height: { xs: "200px", md: "286px" },
        border: "1px solid blue",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        padding: "20px",
        borderRadius: "10px",
        boxSizing: "border-box",
      }}
    >
      {/* Right side content */}
      <Box
        sx={{
          width: "50%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: { xs: "24px", md: "32px" },
            fontWeight: 300,
            lineHeight: "32px",
            letterSpacing: "-0.64px",
            margin: 0,
            wordWrap: "break-word",
          }}
        >
          {heading}
        </Typography>
        <Link to={link} style={{ textDecoration: "none" }}>
          <Button
            variant="text" // Use text variant for no visible border
            sx={{
              backgroundColor: "transparent", // Set background to transparent
              color: "black", // Set text color to black
              mt: 2,
              display: "flex",
              alignItems: "center", // Align items horizontally
              "&:hover": {
                backgroundColor: "transparent", // Keep background transparent on hover
              },
            }}
          >
            <Typography 
              sx={{ 
                fontSize: "inherit", // Match font size with button
                color: "black",
                textTransform: "none", // Prevent text from being capitalized
              }}
            >
              {buttonText}
            </Typography>
            <ArrowCircleUpIcon 
              sx={{ 
                fontSize: "inherit", // Match icon size with text
                color: "black",
                transform: "rotate(90deg)", // Rotate icon 90 degrees
                mx: 1, // Add horizontal margin for space between text and icon
                "&:hover": {
                  color: "darkblue", // Change icon color on hover
                },
              }} 
            />
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Card;
