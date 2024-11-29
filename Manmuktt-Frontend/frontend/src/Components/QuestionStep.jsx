import React, { useState } from "react";
import { Box, Typography, Button, RadioGroup, TextField } from "@mui/material";

// Predefined color array
const predefinedColors = [
  'rgba(249, 182, 137, 1)',
  'rgba(255, 185, 191, 1)',
  'rgba(159, 198, 231, 1)',
  'rgba(154, 180, 215, 1)',
  'rgba(175, 232, 251, 1)',
  'rgba(159, 229, 221, 1)'
];

function QuestionStep({ greeting, question, description, inputType, options, value, onContinue }) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Box
      sx={{
        minHeight:"50vh",
        margin: '0 auto',
        padding: {xs:'10% 5% 5% 5%',sm:'20% 10% 5% 10%',md:'20% 10% 5% 10%',lg:'20% 10% 5% 10%'},
        backgroundColor: '#f9f9f9',
        borderRadius: {xs:'0',sm:'12px 12px 0px 0px',md:'12px 12px 0px 0px',lg:'12px 12px 0px 0px'},
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      {greeting && (
        <Typography variant="h4" gutterBottom>
          {greeting}
        </Typography>
      )}

      <Typography variant="h5" gutterBottom>
        {question}
      </Typography>

      {description && (
        <Typography variant="body1" gutterBottom>
          {description}
        </Typography>
      )}

      {/* Text Input styled as Button */}
      {inputType === "text" && (
        <Button
          variant="contained"
          fullWidth
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'aquamarine',
            marginBottom: '20px',
            '&:hover': { backgroundColor: '#d5d5d5' },
            borderRadius: '15px',
            width: '60%',
            margin: '10px auto',
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your name"
            
            InputProps={{
              disableUnderline: true,
              style: { textAlign: 'center' },
              sx: {
                '&:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px rgba(0, 240, 254, 1) inset', // Light background when autofilled
                  backgroundColor: 'rgba(0, 240, 254, 1) !important',
                },
                '&:-internal-autofill-selected': {
                  backgroundColor: 'rgba(70, 90, 126, 0.4) !important', // Dark background for autofill
                }
              },
            }}
          />
        </Button>
      )}

      {/* Options styled as Buttons with predefined background colors */}
      {inputType === "radio" && options && (
        <RadioGroup value={inputValue} onChange={handleInputChange}>
          {options.map((option, index) => (
            <Button
              key={option}
              fullWidth
              variant="contained"
              onClick={() => setInputValue(option)}
              sx={{
                marginBottom: '15px', // Add more space between buttons
                backgroundColor: predefinedColors[index % predefinedColors.length], // Use predefined colors
                color: '#000', // Black text
                opacity: inputValue === option ? 1 : 0.5, // Adjust opacity for selected/unselected options
                '&:hover': {
                  backgroundColor: predefinedColors[index % predefinedColors.length],
                  opacity: 1, // Full opacity on hover
                },
                padding: '10px',
                fontSize: '16px',
                borderRadius: '15px',
                width: '60%',
                margin: '10px auto', // Center the button
              }}
            >
              {option}
            </Button>
          ))}
        </RadioGroup>
      )}

      <Button
        variant="outlined" // Outline button style
        color="primary"
        onClick={() => onContinue(inputValue)}
        disabled={!inputValue}
        sx={{
          marginTop: '25px', // Add space above the continue button
          width: '60%',
          margin: '0 auto',
          borderRadius: '15px', // Border radius for the continue button
        }}
      >
        Continue
      </Button>
    </Box>
  );
}

export default QuestionStep;
