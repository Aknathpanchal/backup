import React, { useState } from 'react';
import { Box, TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InputSide = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const response = await fetch('https://formspree.io/f/<your-form-id>', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName, email, phone, subject, message }),
    });

    if (response.ok) {
      navigate('/success');
      setButtonLoading(false);
    } else {
      alert('Failed to submit form');
    }
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        {/* First Name and Last Name - side by side */}
        <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
          <TextField
            label="First Name"
            variant="standard"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
            InputLabelProps={{
              shrink: true, // Keeps the label in the "shrunk" position
            }}
          />
          <TextField
            label="Last Name"
            variant="standard"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
            InputLabelProps={{
              shrink: true, // Keeps the label in the "shrunk" position
            }}
          />
        </Box>

        {/* Email and Phone - side by side */}
        <Box sx={{ display: 'flex', gap: '20px', width: '100%' }}>
          <TextField
            label="Email"
            type="email"
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            InputLabelProps={{
              shrink: true, // Keeps the label in the "shrunk" position
            }}
          />
          <TextField
            label="Phone"
            type="tel"
            variant="standard"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            fullWidth
            InputLabelProps={{
              shrink: true, // Keeps the label in the "shrunk" position
            }}
          />
        </Box>

        {/* Select Subject with Radio Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, marginTop: '20px' }}>
          <Typography variant="h6" sx={{ marginBottom: '10px' }}>Select Subject</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <FormControlLabel value="General Inquiry" control={<Radio />} label="General Inquiry" />
              <FormControlLabel value="Careers" control={<Radio />} label="Careers" />
            </RadioGroup>
          </FormControl>
        </Box>

        {/* Message */}
        <TextField
          label="Message"
          variant="standard"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth
          InputLabelProps={{
            shrink: true, // Keeps the label in the "shrunk" position
          }}
        />

        {/* Send Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button type="submit" variant="contained" color="primary" disabled={buttonLoading}>
            {buttonLoading ? 'Loading...' : 'Send Message'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InputSide;
