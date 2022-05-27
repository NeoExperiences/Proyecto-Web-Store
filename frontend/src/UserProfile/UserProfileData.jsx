import { Button, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserProfileData = () => {
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
    <Row>
      <div className="mb-5 mt-5" lg="2" sm="4">
        <div>Username: {userData.username}</div>
        <div>Email: {userData.email}</div>
        <div>Address: {userData.address}</div>
        <Link to={"/Articles"}>
          <Button>Volver</Button>
        </Link>
      </div>
    </Row>
  );
};
