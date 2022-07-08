import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { Login } from "./Login";
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

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

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
      <style type="text/css">
        {`
    .btn-signout {
      background-color: black;
      color: white;
    }
    `}
      </style>
      <Navbar sticky="top" className="elmedioamarillo">
        <Container>
          {userToken ? (
            <>
              <Navbar.Brand
                className="elmedioamarillo"
                as={Link}
                to={"/Articles"}
              >
                <img src="https://i.imgur.com/31D5vPD.png" alt="El Medio"></img>
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link
                  className="elmedioamarillo"
                  style={{ color: "black" }}
                  as={Link}
                  to={"/Articles"}
                >
                  Inicio
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  as={Link}
                  to={"/Profile"}
                  className="elmedioamarillo"
                  style={{ color: "black" }}
                >
                  {userData.username}
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link
                  as={Button}
                  onClick={signOut}
                  variant="signout"
                  style={{ color: "white", fontSize: "1.1em" }}
                >
                  Deslogearse
                </Nav.Link>
              </Nav>
            </>
          ) : (
            <>
              <Navbar.Brand className="elmedioamarillo" as={Link} to={"/Login"}>
                <img src="https://i.imgur.com/31D5vPD.png" alt="El Medio"></img>
              </Navbar.Brand>
              <Nav>
                <Nav.Link
                  as={Link}
                  to={"/Login"}
                  className="elmedioamarillo"
                  style={{ color: "black" }}
                >
                  Logearse
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to={"/Register"}
                  style={{ color: "black" }}
                  className="elmedioamarillo"
                >
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
