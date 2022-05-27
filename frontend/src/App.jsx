import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Pictures } from "./PicturesSRC";
import { Login, UserContextProvider } from "./Login";
import { Products } from "./Products";
import { Articles } from "./Articles";
import { Register } from "./Register";
import { UserProfile } from "./UserProfile";
import { Users } from "./Users";
import { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(
    () => {
      if (!localStorage.getItem("tokenStorage")) {
        navigate(`/login`);
      } else if (/^\/login$/i.test(location.pathname)) {
        navigate(`/articles`);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/userprofile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((userData) => setUserData(userData));
  }, []);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to={"/Articles"}>
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/Articles"}>
              Home
            </Nav.Link>
            {/* <Link to={"/Articles"} className="nav-link" style={{color:"white"}}>Home</Link> */}
            <Nav.Link as={Link} to={"/Pictures"}>
              Pictures
            </Nav.Link>
            <Nav.Link as={Link} to={"/Users"}>
              Users
            </Nav.Link>
            <Nav.Link as={Link} to={"/Profile"}>
              Profile
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to={"/Profile"}>
              {userData.username}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/pictures/*" element={<Pictures />} />
        <Route
          path="/login"
          element={
            <Login
              setToken={(token) => {
                localStorage.setItem("tokenStorage", token);
              }}
              originalPath={"/articles"}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              setToken={(token) => {
                localStorage.setItem("tokenStorage", token);
              }}
              originalPath={"/login"}
            />
          }
        />
        <Route path="/products/*" element={<Products />} />
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/profile/*" element={<UserProfile />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="*" element={<Articles />} />
      </Routes>
    </div>
  );
}

//export default App;
