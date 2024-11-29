import React, { useEffect, useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import ResponsiveAppBar from '../../Components/ResponsiveAppBar';

const WelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', lg: 'row' }, // Column for mobile, row for larger screens
          height: {lg:'90vh'},
          // padding: '10px',
        }}
      >
        {/* Left side container */}
        <Box
          sx={{
            flex: { xs: 'none', lg: '0 0 40%' }, // Full width on mobile, 40% on larger screens
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', lg: 'flex-start' }, // Center align on mobile, left align on larger screens
            padding: { xs: '20px', lg: '10px 10px 10px 120px' }, // Adjust padding for mobile
            gap: '10px',
            textAlign: { xs: 'center', lg: 'left' }, // Center text on mobile
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Zen Antique Soft',
              fontSize: { xs: '32px', lg: '48px' }, // Smaller font size on mobile
              fontWeight: 400,
              lineHeight: { xs: '36px', lg: '52px' }, // Adjust line height for mobile
              letterSpacing: '-1px',
              color: '#000000CC',
              margin: 0,
            }}
          >
            Revolutionizing Mental Health Care with AI
          </Typography>

          {/* Call-to-action container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', lg: 'flex-start' }, // Center the buttons on mobile
              gap: '1rem',
              flexDirection: { xs: 'column', lg: 'row' }, // Stack buttons on mobile, inline on larger screens
            }}
          >
            <Link href="/dashboard" underline="none">
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
                  Get started
                </Typography>
              </Button>
            </Link>
            <Typography
              variant="body1"
              sx={{
                color: '#000000',
                fontFamily: 'Inter',
                fontSize: { xs: '14px', lg: '16px' }, // Adjust font size for mobile
                fontWeight: 400,
                lineHeight: '16px',
              }}
            >
              Start your journey to better mental health
            </Typography>
          </Box>
        </Box>

        {/* Right side container with images */}
        <Box
          sx={{
            flex: { xs: 'none', lg: '0 0 60%' }, // Hide on mobile, take 60% on larger screens
            position: 'relative',
            height: { xs: '30vh',sm:"50vh",md:"60vh", lg: '100%' }, // Adjust height for mobile
            marginLeft: { xs: '0', lg: '-130px' }, // Remove negative margin on mobile
            mt:0, // Add margin-top on mobile
          }}
        >
          {/* Top image */}
          <Box
            component="img"
            src="/assets/BACKGROUND.png"
            alt="Top"
            sx={{
              position: 'absolute',
              width: { xs: '80%', lg: '600px' }, // Adjust image size for mobile
              maxHeight: '100%', // Ensure the image fits within the container
              objectFit: 'contain', // Scale down the image proportionally
              transition: 'transform 0.6s ease, opacity 0.6s ease',
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate(-50%, 0)'
                : 'translate(-50%, -100px)',
              zIndex: 1,
            }}
          />

          {/* Bottom image */}
          <Box
            component="img"
            src="/assets/Group.png"
            alt="Bottom"
            sx={{
              position: 'absolute',
              width: { xs: '70%', lg: '500px' }, // Adjust image size for mobile
              maxHeight: '100%', // Ensure the image fits within the container
              objectFit: 'contain', // Scale down the image proportionally
              transition: 'transform 0.6s ease, opacity 0.6s ease',
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translate(-50%, 0)'
                : 'translate(-50%, 100px)',
              zIndex: 2,
              marginLeft: { xs: '0', lg: '15px' }, // Adjust margin for mobile
              marginTop: { xs: '20px', lg: '50px' }, // Adjust margin for mobile
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default WelcomePage;
