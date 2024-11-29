import React from "react";
import { Box, Button, Typography, Avatar} from "@mui/material";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {

  const pages = [
    { name: "Policy", path: "/#" },
    { name: "Careers", path: "/#" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        margin: "auto",
        padding: { xs: "20px 0px 20px 0px" }, // Responsive padding
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {/* "Your Peace Our Mission" */}
      <Typography
        sx={{
          fontFamily: "Inter, sans-serif",
          fontSize: { xs: "2vw", md: "1.2vw" }, // Responsive font size using vw units
          fontWeight: 700,
          letterSpacing: "2.8px",
          textAlign: "center",
          color: "#000",
          opacity: 0.6,
        }}
      >
        Your Peace Our Mission
      </Typography>

      {/* "Request More Information" */}
      <Typography
        sx={{
          fontFamily: "Zen Antique Soft, serif",
          fontSize: { xs: "5vw", md: "3.5vw" }, // Scales with screen size
          fontWeight: 400,
          textAlign: "center",
          color: "#000",
          lineHeight: { xs: "3.5vw", md: "3.5vw" }, // Line height scales with text size
        }}
      >
        Request More Information
      </Typography>

      {/* Description text */}
      <Typography
        sx={{
          fontFamily: "Inter, sans-serif",
          fontSize: { xs: "2vw", md: "1.2vw" }, // Responsive font size using vw units
          textAlign: "center",
          color: "#000",
          opacity: 0.8,
          maxWidth: "70%", // Controls the width of the text
          lineHeight: { xs: "2vw", md: "2vw" },
        }}
      >
        Optimanage software Pvt Ltd, LLC is a clinical stage healthcare company which is
        developing a unique.
      </Typography>

      <Link
        to="/contact"
        style={{
          textDecoration: "none",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#0097B2", // Button background color
            height: "39px", // Button height
            padding: "9px 15px", // Padding for the button
            borderRadius: "19.5px", // Rounded button
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start", // Align text to left
            gap: "10px", // Gap between elements inside button
            border: "none",
            outline: "none",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#007a8c", // Darker shade on hover
            },
          }}
        >
          <Typography
            component="span"
            sx={{
              color: "#FFFFFF",
              fontFamily: "Overpass, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "20.26px",
              textAlign: "left",
              textTransform: "none",
            }}
          >
            Contact Us
          </Typography>
        </Button>
      </Link>

      {/* Footer text */}
      <Typography
        sx={{
          fontFamily: "Inter, sans-serif",
          fontSize: { xs: "2vw", md: "1vw" }, // Responsive font size using vw units
          textAlign: "center",
          color: "#000",
          opacity: 0.8,
        }}
      >
        © 2024, Optimanage Software Pvt Ltd
        <span  style={{ display: "none" }}>Designed by <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer">Freepik</a></span>
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px", // Limit max width
          borderTop: "1px solid #d3d3d3", // Optional border for separation
        }}
      >
        {/* Left - Company Logo */}
        <Box sx={{ display: "flex", alignItems: "center",margin:1 }}>
          <IconButton
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              p: 0,
            }}
          >
            <Avatar
              alt="Optimanage"
              src="/assets/mannmuktt logo.png" // Update with correct path
              sx={{ height: 40, width: 40 }} // Logo size
            />
          </IconButton>
        </Box>

       
        <Box
          sx={{
            display: {md:"flex",xs:"none"},
            gap: 3,
          }}
        >
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Overpass, sans-serif",
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "20.26px",
                  textTransform: "none",
                  color: "#0A142F",
                }}
              >
                {page.name}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Right - Social Icons */}
        <Box sx={{ display: "flex", gap: 2, margin:1 }}>
          <IconButton href="https://www.facebook.com/profile.php?id=61566263410151&mibextid=ZbWKwL" target="_blank" aria-label="Facebook">
            <FacebookIcon sx={{ color: "#3b5998" }} />
          </IconButton>
          <IconButton href="https://www.youtube.com/@Mannmuktt" target="_blank" aria-label="Twitter">
            <YouTubeIcon sx={{ color: "red" }} />
          </IconButton>
          <IconButton href="https://www.instagram.com/mannmuktt/profilecard/?igsh=MmtncWd6MGZldzR0" target="_blank" aria-label="Instagram">
            <InstagramIcon sx={{ color: "#C13584" }} />
          </IconButton>
          <IconButton href="https://www.linkedin.com/company/mannmuktt-ai/posts/?feedView=all" target="_blank" aria-label="LinkedIn">
            <LinkedInIcon sx={{ color: "#0A66C2" }} />
          </IconButton>
        </Box>
      </Box>

    </Box>
  );
};

export default Footer;
