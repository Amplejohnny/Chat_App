import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import MobileUnsupported from "./components/MobileUnsupported";

function App() {
  const { user } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is less than 768px (typical mobile devices)
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on component mount
    checkScreenWidth();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return (
    <div>
      {isMobile ? (
        <MobileUnsupported />
      ) : (
        <ChatContextProvider user={user}>
          <NavBar />
          <Container>
            <Routes>
              <Route path="/" element={user ? <Chat /> : <Login />} />
              <Route path="/login" element={user ? <Chat /> : <Login />} />
              <Route path="/register" element={user ? <Chat /> : <Register />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </ChatContextProvider>
      )}
    </div>
  );
}

export default App;
