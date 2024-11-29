import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import DetailsBar from './DetailsBar';
import InputSide from './InputSide';

const FormPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        paddingBottom: '50px',
      }}
    >
      <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
        <Typography variant="h4" color="primary">
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Any question or remarks? Just write us a message.
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ marginTop: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px', display: 'flex', gap: '10px', flexDirection: { xs: 'column', md: 'row' } }}>
          <DetailsBar />
          <InputSide />
        </Paper>
      </Container>
    </Box>
  );
};

export default FormPage;
