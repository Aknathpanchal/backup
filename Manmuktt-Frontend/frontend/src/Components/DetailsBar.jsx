import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Phone, Mail, Facebook, Instagram, LinkedIn } from '@mui/icons-material';

const DetailsBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'rgb(8, 8, 63)',
        borderRadius: '7px',
        padding: '30px',
        color: '#fff',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: '100%',
      }}
    >
      {/* Top section for the contact information */}
      <Box sx={{ marginBottom: 'auto' }}>
        <Typography variant="h6" gutterBottom>
          Contact Information
        </Typography>
        <Typography variant="body2" gutterBottom>
          Fill up the form and our team will get back to you within 24 hours.
        </Typography>
      </Box>

      {/* Center section for phone and email */}
      <Box sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <Link href="tel:+233543201893" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <Phone sx={{ color: 'rgb(252, 113, 137)' }} /> +233543201893
        </Link>
        <Link href="mailto:aljay3334@gmail.com" underline="none" sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', color: '#fff' }}>
          <Mail sx={{ color: 'rgb(252, 113, 137)' }} /> aljay3334@gmail.com
        </Link>
      </Box>

      {/* Bottom section for social media icons */}
      <Box sx={{ marginTop: 'auto' }}>
        <IconButton href="https://www.facebook.com/profile.php?id=100021937291259" sx={{ color: '#fff' }}>
          <Facebook />
        </IconButton>
        <IconButton href="https://www.instagram.com/_allenjones/" sx={{ color: '#fff' }}>
          <Instagram />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/allen-jones-b799b7171/" sx={{ color: '#fff' }}>
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DetailsBar;
