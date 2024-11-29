import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ImageTextBlock = ({
  heading,
  paragraph,
  buttonLabel,
  imageSrc,
  position = "left",
}) => {
  const isLeft = position === "left";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: {xs: "column", sm: "column", md: isLeft ? "row" : "row-reverse" }, // Column for small screens
        width: "100%",
        padding: "20px 0",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "20px",sm: "20px", md: 0 },
        }}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={heading}
            style={{
              maxWidth: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xss: "center",sm: "center", md: "left" },
          alignItems: { xs: "center",sm: "center", md: "flex-start" }, 
        }}
      >
        {heading && (
          <Typography
            sx={{
              color: "#000000CC",
              fontFamily: "Zen Antique Soft",
              fontSize: buttonLabel ? "48px" : "32px",
              fontWeight: 400,
              lineHeight: "52px",
              letterSpacing: "-1px",
              textAlign: { xs: "center",sm: "center", md: "left" },
              width: {xs:"auto",sm:"auto",md:buttonLabel ? "564px" : "406px"}, // Conditional width
              height: {xs:"auto",sm:"auto",md:buttonLabel ? "156px" : "52px"},
              opacity: 1, // Fully visible
            }}
            component="h2"
            gutterBottom
          >
            {heading}
          </Typography>
        )}
        {paragraph && (
          <Typography
            sx={{
              color: "#000000",
              fontFamily: "Inter",
              fontSize: "20px",
              fontWeight: buttonLabel ? 300 : 400,
              lineHeight: "30px",
              letterSpacing: "-1px",
              textAlign: { xs:"center",sm: "center", md: "left" },
              width: {xs:"auto",sm:"auto",md:buttonLabel ? "484px" : "406px"}, // Conditional width
              height: {xs:"auto",sm:"auto",md:buttonLabel ? "210px" : "90px"},
              opacity: 0.6, // Set opacity as specified
            }}
            variant="body1"
            gutterBottom
          >
            {paragraph}
          </Typography>
        )}
        {buttonLabel && (
           <Button
           variant="contained"
           sx={{
             backgroundColor: '#0097B2', // Button background color
             height: '39px', // Button height
             padding: '9px 15px', // Padding for the button
             borderRadius: '19.5px', // Rounded button
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'flex-start', // Align text to left
             gap: '10px', // Gap between elements inside button
             border: 'none',
             outline: 'none',
             cursor: 'pointer',
             '&:hover': {
               backgroundColor: '#007a8c', // Darker shade on hover
             },
           }}
         >
           <Typography
             component="span"
             sx={{
               color: '#FFFFFF',
               fontFamily: 'Overpass, sans-serif',
               fontSize: '16px',
               fontWeight: 700,
               lineHeight: '20.26px',
               textAlign: 'left',
               textTransform: 'none',
             }}
           >
             {buttonLabel}
           </Typography>
         </Button>
        )}
      </Box>
    </Box>
  );
};

export default ImageTextBlock;
