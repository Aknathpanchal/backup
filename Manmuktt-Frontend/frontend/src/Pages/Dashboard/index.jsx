import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "../../Components/Card";
import Footer from "../../Components/Footer";
import ResponsiveAppBar from "../../Components/ResponsiveAppBar";
import { Typography } from "@mui/material";

const Dashboard = () => {
  // Define the function to handle button click
  const handleButtonClick = () => {
    // Open the external URL
    window.open("https://face-emotion.s3.amazonaws.com/index.html", "_self");
  };

  // Define the card data
  const cardData = [
    {
      backgroundImg: "/assets/poster2.png",
      heading: "Mannmuktt Sessions",
      buttonText: "Let's Go",
      link: "/#",
    },
    {
      backgroundImg: "/assets/poster1.png",
      heading: "Chat bot",
      buttonText: "Let's Go",
      link: "/pre-Session",
    },
  ];

  return (
    <>
      <ResponsiveAppBar />

      <Box
        sx={{
          background: "#08404d",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            flex: { xs: "none", lg: "0 0 40%" }, // Full width on mobile, 40% on larger screens
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", // Center align on mobile, left align on larger screens
            padding:{xs:"10%",md:"5%"} ,
            gap: "10px",
            textAlign: { xs: "center", lg: "left" }, // Center text on mobile
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Zen Antique Soft",
              fontSize: { xs: "32px", lg: "48px" }, // Smaller font size on mobile
              fontWeight: 400,
              lineHeight: { xs: "36px", lg: "52px" }, // Adjust line height for mobile
              letterSpacing: "-1px",
              color: "#FFFFFFCC",
              margin: 0,
            }}
          >
            Revolutionizing Mental Health Care with AI
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#FFFFFFCC",
              fontFamily: "Inter",
              fontSize: { xs: "14px", lg: "16px" }, // Adjust font size for mobile
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            What type of therapy are you looking for ?
          </Typography>
        </Box>

        <Container
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pb: 4,
            justifyContent: "center",
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              display: "flex",
            }}
          >
            {/* First two cards side by side */}
            {cardData.slice(0, 2).map((card, index) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                key={index}
                sx={{
                  justifyContent: "center", // Centers content horizontally
                  display: "flex", // Ensures flexbox display
                }}
              >
                <Card
                  backgroundImg={card.backgroundImg}
                  heading={card.heading}
                  buttonText={card.buttonText}
                  link={card.link}
                />
              </Grid>
            ))}

            {/* Third card spanning the full width */}
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              sx={{
                justifyContent: "center", // Centers content horizontally
                display: "flex", // Ensures flexbox display
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(/assets/poster3.png)`,
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
                onClick={handleButtonClick}
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
                    Know Your Mood
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default Dashboard;
