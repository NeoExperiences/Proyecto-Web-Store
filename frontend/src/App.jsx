import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Login, UserContextProvider } from "./Login";
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
import { Button } from "react-bootstrap";
import { useUserPrivilege } from "./SharedHooks/customHooks";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = useUserPrivilege("admin");

  const [userToken, setUserToken] = useState(
    localStorage.getItem("tokenStorage")
  );

  useEffect(
    () => {
      if (
        !localStorage.getItem("tokenStorage") &&
        !/^\/register$/i.test(location.pathname)
      ) {
        navigate(`/login`);
      } else if (/^\/login$/i.test(location.pathname)) {
        navigate(`/articles`);
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const setToken = (token) => {
    localStorage.setItem("tokenStorage", token);
    setUserToken(token);
  };

  const signOut = () => {
    localStorage.removeItem("tokenStorage");
    setUserToken(null);
    navigate("/login");
  };

  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/userprofile`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((userData) => setUserData(userData));
  }, [userToken]);

  return (
    <div className="App">
      <Navbar bg="primary" variant="dark">
        <Container>
          {userToken ? (
            <>
              <Navbar.Brand as={Link} to={"/Articles"}>
                Navbar
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link as={Link} to={"/Articles"}>
                  Home
                </Nav.Link>
                {isAdmin && (
                  <Nav.Link as={Link} to={"/Users"}>
                    Administrator Panel
                  </Nav.Link>
                )}
              </Nav>
              <Nav>
                <Nav.Link as={Link} to={"/Profile"}>
                  {userData.username}
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={Button} onClick={signOut}>
                  Deslogearse
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Navbar.Brand>Navbar</Navbar.Brand>
              <Nav>
                <Nav.Link as={Link} to={"/Login"}>
                  Logearse
                </Nav.Link>
                <Nav.Link as={Link} to={"/Register"}>
                  Registrarse
                </Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} originalPath={"/articles"} />}
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
        <Route path="/articles/*" element={<Articles />} />
        <Route path="/profile/*" element={<UserProfile />} />
        <Route path="/users/*" element={<Users />} />
        <Route path="*" element={<Articles />} />
      </Routes>
    </div>
  );
}

//export default App;
