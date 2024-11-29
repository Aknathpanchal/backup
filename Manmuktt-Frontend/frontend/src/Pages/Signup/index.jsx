// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";

// const Signup = () => {
//   const [userName, setUserName] = useState(""); // State for username
//   const [email, setEmail] = useState(""); // State for email
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(""); // Error state
//   const [successData, setSuccessData] = useState(null); // State for successful data
//   const [openModal, setOpenModal] = useState(false); // State for modal

//   const handleSignup = async () => {
//     if (!userName || !email) {
//       setError("Username and email cannot be empty");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/signup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: userName,
//           email: email,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Handle successful registration and show modal
//         setSuccessData(data); // Save the data
//         setOpenModal(true);   // Open the modal
//       } else {
//         // Handle server error response
//         setError(data.message || "Error registering user");
//       }
//     } catch (error) {
//       setError("Error connecting to server");
//     } finally {
//       setLoading(false); // Stop loading once the request is done
//     }
//   };

//   // Function to copy token to clipboard
//   const handleCopyToken = () => {
//     navigator.clipboard.writeText(successData.token).then(() => {
//       alert("Token copied to clipboard!");
//     }).catch(err => {
//       console.error("Failed to copy token: ", err);
//     });
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   return (
//     <>
//       <Box
//         sx={{
//           backgroundColor: "#08404d",
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* AppBar and Form */}
//         <AppBar position="static" sx={{ backgroundColor: "white", color: "black" }}>
//           <Container maxWidth="xl">
//             <Box
//               component="a"
//               href="#"
//               sx={{ display: { xs: "none", lg: "flex" } }}
//             >
//               <img src="/assets/mannmuktt logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
//             </Box>
//             <Box
//               component="a"
//               href="#"
//               sx={{
//                 display: { xs: "flex", lg: "none" },
//                 flexGrow: 1,
//                 justifyContent: "center",
//               }}
//             >
//               <img src="/assets/mannmuktt logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
//             </Box>
//           </Container>
//         </AppBar>

//         <Grid
//           container
//           justifyContent="center"
//           alignItems="center"
//           sx={{
//             backgroundImage: `url(/assets/bc.png)`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             flex: 1,
//             padding: 2,
//           }}
//         >
//           <Grid
//             item
//             xs={12}
//             sm={8}
//             md={6}
//             lg={4}
//             sx={{
//               backgroundColor: "white",
//               borderRadius: 2,
//               padding: 4,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//             }}
//           >
//             <Typography variant="h4" component="p" sx={{ fontFamily: "Inter", fontWeight: 600, textAlign: "center", mb: 2 }}>
//               Create an account
//             </Typography>

//             <TextField
//               label="User name"
//               variant="outlined"
//               fullWidth
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               required
//               InputLabelProps={{
//                 sx: {
//                   "& .MuiFormLabel-asterisk": { color: "red" },
//                 },
//               }}
//             />

//             <TextField
//               label="Email"
//               variant="outlined"
//               fullWidth
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               InputLabelProps={{
//                 sx: {
//                   "& .MuiFormLabel-asterisk": { color: "red" },
//                 },
//               }}
//             />

//             {error && (
//               <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
//                 {error}
//               </Typography>
//             )}

//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleSignup}
//               disabled={loading}
//               sx={{
//                 backgroundColor: loading ? "#ccc" : "#0097B2",
//                 color: "white",
//                 padding: 1.5,
//                 "&:hover": { backgroundColor: "#007a92" },
//               }}
//             >
//               {loading ? "Signing Up..." : "Generate Token"}
//             </Button>

//             <Typography variant="body2" sx={{ color: "#555", textAlign: "center", mt: 2 }}>
//               Already have an account?{" "}
//               <a href="/login" style={{ color: "#0097B2", textDecoration: "none" }}>
//                 Log in
//               </a>
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* Custom Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal}>
//         <DialogTitle>Registration Successful</DialogTitle>
//         <DialogContent>
//           <Typography>Token:{successData?.token}</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCopyToken} color="primary">
//             Copy Token
//           </Button>
//           <Button onClick={handleCloseModal} color="secondary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default Signup;

