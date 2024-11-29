import { Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Pages/Signup/index";
import Login from "./Pages/Login/index";
import WelcomePage from "./Pages/WelcomePage/index";
import Error404 from "./Pages/Error404";
// import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./Pages/Dashboard";
// import Assessment from "./Components/Assessment";
import Questionnaire from "./Components/Questionnaire";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import ChatBot from "./Pages/ChatBot";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route
          path="/dashboard"
          element={<Dashboard/>}
        />
         <Route
          path="/pre-Session"
          element={<Questionnaire/>}
        />
          <Route
          path="/chatbot"
          element={<ChatBot/>}
        />
        {/* <Route
          path="/dashboard"
          element={<ProtectedRoutes Component={Dashboard} />}
        />
         <Route
          path="/pre-Session"
          element={<ProtectedRoutes Component={Questionnaire} />}
        />
          <Route
          path="/chatbot"
          element={<ProtectedRoutes Component={ChatBot} />}
        /> */}
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
