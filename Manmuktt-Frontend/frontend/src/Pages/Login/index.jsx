// import React, { useState } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState(""); 
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(""); 
//   const [message, setMessage] = useState(""); 
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!userName || !password) {
//       setError("Both username and password are required.");
//       return;
//     }

//     setLoading(true); // Start loading
//     setError(""); // Clear any previous errors
//     setMessage(""); // Clear previous success message

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userName: userName,
//           password: password,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         localStorage.setItem("authDetails", JSON.stringify(data));
//         navigate("/dashboard");
//       } else {
//         // Handle login errors
//         setError(data.message || "Error during login.");
//       }
//     } catch (error) {
//       console.error("Error connecting to server", error);
//       setError("Error connecting to server");
//     } finally {
//       setLoading(false); 
//     }
//   };

//   return (
//     <div style={{ background: "#08404d", height: "100vh" }}>
//       <AppBar
//         position="static"
//         sx={{ backgroundColor: "white", color: "black" }}
//       >
//         <Container maxWidth="xl">
//           <Box
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: "none", lg: "flex" },
//             }}
//           >
//             <img src="/assets/mannmuktt logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
//           </Box>
//           <Box
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               display: { xs: "flex", lg: "none" },
//               flexGrow: 1,
//               justifyContent: "center",
//             }}
//           >
//             <img src="/assets/mannmuktt logo.png" alt="Logo" style={{ height: 40, width: "auto" }} />
//           </Box>
//         </Container>
//       </AppBar>

//       <div
//         style={{
//           height: "94%",
//           width: "100%",
//           backgroundImage: `url(/assets/bc.png)`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <div
//           style={{
//             background: "white",
//             maxWidth: "400px",
//             width: "100%",
//             borderRadius: "10px",
//             padding: "50px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             gap: "20px",
//             boxSizing: "border-box",
//           }}
//         >
//           <p
//             style={{
//               margin: 0,
//               fontSize: "36px",
//               fontFamily: "Inter",
//               fontWeight: 600,
//               lineHeight: "43.57px",
//               letterSpacing: "-0.005em",
//               textAlign: "right",
//             }}
//           >
//             Sign in
//           </p>

//           <input
//             className="input-custom"
//             placeholder="User name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)} // Update username state
//           />

//           <input
//             className="input-custom"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)} // Update password state
//           />

//           {error && (
//             <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
//               {error}
//             </p>
//           )}

//           {message && (
//             <p style={{ color: "green", fontSize: "14px", textAlign: "center" }}>
//               {message}
//             </p>
//           )}

//           <button
//             onClick={handleLogin}
//             size="medium"
//             disabled={loading} // Disable button if loading
//             style={{
//               borderRadius: "5px",
//               background: loading ? "#ccc" : "#0097B2",
//               color: "white",
//               width: "100%",
//               padding: "15px",
//               border: "none",
//               fontFamily: "Overpass",
//               fontSize: "16px",
//               fontWeight: "500",
//               cursor: loading ? "not-allowed" : "pointer", // Prevent clicking during loading
//             }}
//           >
//             {loading ? "Logging in..." : "Sign In"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
