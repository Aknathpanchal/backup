import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Typography, Paper, Avatar, SvgIcon } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

// Check for SpeechRecognition compatibility
const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

// Custom Arrow Icon Component
function ArrowIcon(props) {
  return (
    <SvgIcon
      {...props}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </SvgIcon>
  );
}

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userData, setUserData] = useState({ name: '' });

  const bottomRef = useRef(null);
  const [userId, setUserId] = useState(null); // Store userId

  // States for voice recording
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    const authDetails = localStorage.getItem('authDetails');
    if (authDetails) {
      const parsedAuthDetails = JSON.parse(authDetails);
      const token = parsedAuthDetails?.token;

      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserId(decoded.id); // Set userId from decoded token
          fetchUserData(decoded.id); // Fetch user data using userId
        } catch (error) {
          console.error("Token is invalid or expired:", error);
          // Optionally navigate to login page if needed
        }
      } else {
        console.error("No token found.");
        // Optionally navigate to login page if needed
      }
    } else {
      console.error("No auth details found.");
      // Optionally navigate to login page if needed
    }
  }, []);

  const fetchUserData = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/info/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.userInfo);
        const initialMessage = { text: `Hello! ${data.userInfo.name}, how can I assist you today?`, sender: 'bot' };
        setMessages([initialMessage]);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        const errorMessage = { text: 'Hello! How can I assist you today?', sender: 'bot' };
        setMessages([errorMessage]);
      });
  };

  // Auto-scroll to bottom when a new message is added
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      const requestData = {
        "query": input,
        "user_profile": {
          "user_id": userId,
          "personal_info": {
            "name": userData.name,
            "age": userData.ageRange,
            "gender": userData.gender,
            "email": "john.doe@example.com",
            "phone": ""
          },
          "health_info": {
            "mental_health_issues": [
              "",
              ""
            ],
            "physical_health_issues": [
              "",
              ""
            ],
            "medications": [
              {
                "name": "Sertraline",
                "dosage": "50 mg",
                "frequency": "Once daily"
              },
              {
                "name": "Lisinopril",
                "dosage": "10 mg",
                "frequency": "Once daily"
              }
            ]
          },
          "therapy_history": {
            "sessions_completed": 10,
            "last_session_date": "2024-09-20",
            "goals": [
              "Manage anxiety",
              "Improve work-life balance",
              "Reduce depressive symptoms"
            ]
          },
          "lifestyle_info": {
            "exercise_routine": "Moderate exercise 3 times a week",
            "dietary_habits": "Mostly balanced diet with occasional unhealthy meals",
            "sleep_habits": "Sleeps 6-7 hours per night"
          },
          "emergency_contact": {
            "name": "Jane Doe",
            "relationship": "Spouse",
            "phone": "+1-555-555-5556"
          }
        },
        "chat_history": {
          "user_id": userId,
          "sessions": {

          }
        }
      }
             https://manchat-hgfafagrbnfnfce8.eastus-01.azurewebsites.net/
      fetch('https://manchat-hgfafagrbnfnfce8.eastus-01.azurewebsites.net/api/text_chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          const botResponse = { text: data.response, sender: 'bot' };
          handleChatHistory(userId, input, data.response)
          setMessages((prevMessages) => [...prevMessages, botResponse]);
        })
        .catch((error) => {
          console.error("Error fetching chatbot response:", error);
          const botErrorResponse = { text: 'Sorry, I am unable to respond at the moment.', sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, botErrorResponse]);
        });

      setInput(''); // Clear the input field
    }
  };


  async function handleChatHistory(userId, input, response) {


    if (!userId || !input || !response) {
      console.error("Missing required data: userId, input (question), or response.");
      return;
    }
    // Create the payload to be sent to the backend
    const payload = {
      user_id: userId,
      question: input,
      answer: response
    };

    try {
      // Use fetch to send a POST request to the /history endpoint
      const result = await fetch(`${process.env.REACT_APP_API_URL}/chat/history`, {
        method: 'POST', // Set the method as POST
        headers: {
          'Content-Type': 'application/json', // Send JSON data
        },
        body: JSON.stringify(payload), // Convert payload to JSON
      });

      // Check if the request was successful
      if (!result.ok) {
        throw new Error(`Server error: ${result.statusText}`);
      }

      // Parse the JSON response
      const data = await result.json();
      console.log('Chat history updated:', data);
      return data; // Return the response data if needed
    } catch (error) {
      // Handle any errors that occurred during the fetch
      console.error('Error updating chat history:', error);
    }
  }


  const handleInputChange = (e) => setInput(e.target.value);

  // Function to handle voice recording
  const handleMicClick = () => {
    if (!SpeechRecognitionAPI) {
      alert("Sorry, your browser does not support Speech Recognition.");
      return;
    }

    if (isRecording) {
      // If already recording, stop recognition
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      // Start recording
      const recognition = new SpeechRecognitionAPI();
      recognition.lang = 'en-US'; // Set language as needed
      recognition.interimResults = true; // Enable live transcription
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        console.log("Voice recognition started. Speak into the microphone.");
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscriptLocal = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interimTranscriptLocal += transcriptPart;
          }
        }

        // Update the input field with interim transcript
        setInterimTranscript(interimTranscriptLocal);
        setInput(prev => prev.startsWith(finalTranscript) ? finalTranscript + interimTranscriptLocal : finalTranscript + interimTranscriptLocal);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);

        // Provide user feedback based on the error type
        switch (event.error) {
          case 'network':
            alert("Network error occurred during speech recognition. Please check your internet connection and try again.");
            break;
          case 'not-allowed':
            alert("Microphone access was denied. Please allow microphone access and try again.");
            break;
          case 'no-speech':
            alert("No speech was detected. Please try speaking again.");
            break;
          case 'audio-capture':
            alert("No microphone was found. Please ensure a microphone is connected.");
            break;
          default:
            alert("An unknown error occurred during speech recognition. Please try again.");
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        console.log("Voice recognition ended.");
      };

      recognitionRef.current = recognition;
      try {
        recognition.start();
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="40vh"
      width="80%"
      margin="0 auto"
      bgcolor="#003D48"
      overflow="hidden"
    >
      {/* Chat messages */}
      <Box
        flex={1}
        padding={2}
        overflow="auto"
        display="flex"
        flexDirection="column"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            marginBottom={2}
          >
            {message.sender === 'bot' && (
              <Avatar
                src="/assets/mannmuktt logo.png"
                alt="Bot Avatar"
                sx={{ marginRight: 2 }}
              />
            )}
            <Paper
              elevation={1}
              sx={{
                padding: '10px',
                borderRadius: '8px',
                maxWidth: '70%',
                backgroundColor: message.sender === 'user' ? '#0b93f6' : '#e5e5ea',
                color: message.sender === 'user' ? '#fff' : '#000',
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
            {message.sender === 'user' && (
              <Avatar
                src="https://via.placeholder.com/40/0b93f6/ffffff?text=U"
                alt="User Avatar"
                sx={{ marginLeft: 2 }}
              />
            )}
          </Box>
        ))}
        {/* Empty div at the bottom to ensure smooth scrolling */}
        <div ref={bottomRef} />
      </Box>

      {/* Input box */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        bgcolor="#0097B2"
        border="1px solid #9494c2"
        sx={{ width: '100%', borderRadius: '50px', boxSizing: 'border-box', marginBottom: 2 }}
      >
        {/* Left-side Mic Button */}
        <Button
          onClick={handleMicClick} // Attach the handler
          sx={{
            borderRadius: '50px',
            minWidth: '50px',
            height: '50px',
            backgroundColor: isRecording ? '#f44336' : 'white', // Change color when recording
            '&:hover': {
              opacity: 0.8,
              backgroundColor: isRecording ? '#f44336' : 'white',
            },
            transition: 'background-color 0.3s',
          }}
        >
          <MicIcon color={isRecording ? 'error' : 'primary'} />
        </Button>

        {/* TextField */}
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={handleInputChange}
          fullWidth
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          sx={{
            mx: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '& input': {
                padding: 0,
              },
            },
          }}
        />

        {/* Right-side Send Button */}
        <Button
          onClick={handleSend}
          sx={{
            borderRadius: '50px',
            minWidth: '50px',
            height: '50px',
            backgroundColor: '#003D48',
            '&:hover': {
              opacity: 0.8,
              backgroundColor: 'white',
            },
          }}
        >
          <ArrowIcon sx={{ color: '#FFFFFFCC', transform: 'rotate(270deg)' }} />
        </Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;





// import React, { useState, useEffect, useRef } from 'react';
// import { Box, TextField, Button, Typography, Paper, Avatar, SvgIcon } from '@mui/material';
// import MicIcon from '@mui/icons-material/Mic';
// import {jwtDecode} from "jwt-decode"; // Import jwt-decode

// function ArrowIcon(props) {
//   return (
//     <SvgIcon
//       {...props}
//       viewBox="0 0 24 24"
//       strokeWidth="2"
//       stroke="currentColor"
//       fill="none"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path stroke="none" d="M0 0h24v24H0z" fill="none" />
//       <path d="M5 12l14 0" />
//       <path d="M13 18l6 -6" />
//       <path d="M13 6l6 6" />
//     </SvgIcon>
//   );
// }

// const ChatRoom = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [userData, setUserData] = useState({ name: '' });
  
//   const bottomRef = useRef(null);
//   const [userId, setUserId] = useState(null); // Store userId

//   useEffect(() => {
//     const authDetails = localStorage.getItem('authDetails');
//     if (authDetails) {
//       const parsedAuthDetails = JSON.parse(authDetails);
//       const token = parsedAuthDetails?.token;

//       if (token) {
//         try {
//           const decoded = jwtDecode(token);
//           setUserId(decoded.id); // Set userId from decoded token
//           fetchUserData(decoded.id); // Fetch user data using userId
//         } catch (error) {
//           console.error("Token is invalid or expired:", error);
//           // Optionally navigate to login page if needed
//         }
//       } else {
//         console.error("No token found.");
//         // Optionally navigate to login page if needed
//       }
//     } else {
//       console.error("No auth details found.");
//       // Optionally navigate to login page if needed
//     }
//   }, []);

//   const fetchUserData = (userId) => {
//     fetch(`${process.env.REACT_APP_API_URL}/info/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserData(data.userInfo);
//         const initialMessage = { text: `Hello! ${data.userInfo.name}, how can I assist you today?`, sender: 'bot' };
//         setMessages([initialMessage]);
//       })
//       .catch((error) => {
//         const errorMessage = { text: 'Hello! How can I assist you today?', sender: 'bot' };
//         setMessages([errorMessage]);
//       });
//   };

//   // Auto-scroll to bottom when a new message is added
//   useEffect(() => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const handleSend = () => {
//     if (input.trim()) {
//       const newMessage = { text: input, sender: 'user' };
//       setMessages((prevMessages) => [...prevMessages, newMessage]);

//       const requestData =  {
//         "query": input,
//         "user_profile": {
//           "user_id": userId,
//           "personal_info": {
//             "name":userData.name ,
//             "age": userData.ageRange,
//             "gender": userData.gender,
//             "email": "john.doe@example.com",
//             "phone": "+1-555-555-5555"
//           },
//           "health_info": {
//             "mental_health_issues": [
//               "Anxiety",
//               "Depression"
//             ],
//             "physical_health_issues": [
//               "High Blood Pressure",
//               "Chronic Fatigue"
//             ],
//             "medications": [
//               {
//                 "name": "Sertraline",
//                 "dosage": "50 mg",
//                 "frequency": "Once daily"
//               },
//               {
//                 "name": "Lisinopril",
//                 "dosage": "10 mg",
//                 "frequency": "Once daily"
//               }
//             ]
//           },
//           "therapy_history": {
//             "sessions_completed": 10,
//             "last_session_date": "2024-09-20",
//             "goals": [
//               "Manage anxiety",
//               "Improve work-life balance",
//               "Reduce depressive symptoms"
//             ]
//           },
//           "lifestyle_info": {
//             "exercise_routine": "Moderate exercise 3 times a week",
//             "dietary_habits": "Mostly balanced diet with occasional unhealthy meals",
//             "sleep_habits": "Sleeps 6-7 hours per night"
//           },
//           "emergency_contact": {
//             "name": "Jane Doe",
//             "relationship": "Spouse",
//             "phone": "+1-555-555-5556"
//           }
//         },
//         "chat_history": {
//           "user_id": userId,
//           "sessions": {
        
//           }
//         }
//       }

//       fetch('https://manchat-hgfafagrbnfnfce8.eastus-01.azurewebsites.net/api/text_chatbot', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestData),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           const botResponse = { text: data.response, sender: 'bot' };
//           handleChatHistory(userId,input,data.response)
//           setMessages((prevMessages) => [...prevMessages, botResponse]);
//         })
//         .catch(() => {
//           const botErrorResponse = { text: 'Sorry, I am unable to respond at the moment.', sender: 'bot' };
//           setMessages((prevMessages) => [...prevMessages, botErrorResponse]);
//         });

//       setInput(''); // Clear the input field
//     }
//   };


//   async function handleChatHistory(userId, input, response) {


//     if (!userId || !input || !response) {
//       console.error("Missing required data: userId, input (question), or response.");
//       return;
//   }
//     // Create the payload to be sent to the backend
//     const payload = {
//         user_id: userId,
//         question: input,
//         answer: response
//     };

//     try {
//         // Use fetch to send a POST request to the /history endpoint
//         const result = await fetch(`${process.env.REACT_APP_API_URL}/chat/history`, {
//             method: 'POST', // Set the method as POST
//             headers: {
//                 'Content-Type': 'application/json', // Send JSON data
//             },
//             body: JSON.stringify(payload), // Convert payload to JSON
//         });

//         // Check if the request was successful
//         if (!result.ok) {
//             throw new Error(`Server error: ${result.statusText}`);
//         }

//         // Parse the JSON response
//         const data = await result.json();
//         console.log('Chat history updated:', data);
//         return data; // Return the response data if needed
//     } catch (error) {
//         // Handle any errors that occurred during the fetch
//         console.error('Error updating chat history:', error);
//     }
// }


//   const handleInputChange = (e) => setInput(e.target.value);

//   return (
//     <Box
//       display="flex"
//       flexDirection="column"
//       height="40vh"
//       width="80%"
//       margin="0 auto"
//       bgcolor="#003D48"
//       overflow="hidden"
//     >
//       {/* Chat messages */}
//       <Box
//         flex={1}
//         padding={2}
//         overflow="auto"
//         display="flex"
//         flexDirection="column"
//       >
//         {messages.map((message, index) => (
//           <Box
//             key={index}
//             display="flex"
//             justifyContent={message.sender === 'user' ? 'flex-end' : 'flex-start'}
//             marginBottom={2}
//           >
//             {message.sender === 'bot' && (
//               <Avatar
//                 src="/assets/mannmuktt logo.png"
//                 alt="Bot Avatar"
//                 sx={{ marginRight: 2 }}
//               />
//             )}
//             <Paper
//               elevation={1}
//               sx={{
//                 padding: '10px',
//                 borderRadius: '8px',
//                 maxWidth: '70%',
//                 backgroundColor: message.sender === 'user' ? '#0b93f6' : '#e5e5ea',
//                 color: message.sender === 'user' ? '#fff' : '#000',
//               }}
//             >
//               <Typography>{message.text}</Typography>
//             </Paper>
//             {message.sender === 'user' && (
//               <Avatar
//                 src="https://via.placeholder.com/40/0b93f6/ffffff?text=U"
//                 alt="User Avatar"
//                 sx={{ marginLeft: 2 }}
//               />
//             )}
//           </Box>
//         ))}
//         {/* Empty div at the bottom to ensure smooth scrolling */}
//         <div ref={bottomRef} />
//       </Box>

//       {/* Input box */}
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         bgcolor="#0097B2"
//         border="1px solid #9494c2"
//         sx={{ width: '100%', borderRadius: '50px', boxSizing: 'border-box', marginBottom: 2 }}
//       >
//         {/* Left-side Mic Button */}
//         <Button
//           sx={{
//             borderRadius: '50px',
//             minWidth: '50px',
//             height: '50px',
//             backgroundColor: 'white',
//             '&:hover': {
//               opacity: 0.8,
//               backgroundColor: 'white',
//             },
//           }}
//         >
//           <MicIcon />
//         </Button>

//         {/* TextField */}
//         <TextField
//           variant="outlined"
//           placeholder="Type a message..."
//           value={input}
//           onChange={handleInputChange}
//           fullWidth
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           sx={{
//             mx: 1,
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 border: 'none',
//               },
//               '& input': {
//                 padding: 0,
//               },
//             },
//           }}
//         />

//         {/* Right-side Send Button */}
//         <Button
//           onClick={handleSend}
//           sx={{
//             borderRadius: '50px',
//             minWidth: '50px',
//             height: '50px',
//             backgroundColor: '#003D48',
//             '&:hover': {
//               opacity: 0.8,
//               backgroundColor: 'white',
//             },
//           }}
//         >
//           <ArrowIcon sx={{ color: '#FFFFFFCC', transform: 'rotate(270deg)' }} />
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ChatRoom;