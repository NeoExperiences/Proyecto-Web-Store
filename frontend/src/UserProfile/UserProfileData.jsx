import { Button, Form, Image, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserProfileEdit } from "./UserProfileEdit";

export const UserProfileData = () => {
  const [userData, setUserData] = useState({});
  const [enableEdit, setEnableEdit] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/userprofile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((userData) => setUserData(userData));
  }, []);

  const refreshUserProfileData = () => {
    fetch(`http://localhost:5000/userprofile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((fetchedUser) => setUserData(fetchedUser));
  };

  const toggleEdit = () => {
    if (enableEdit) setEnableEdit(false);
    else setEnableEdit(true);
  };

  return (
    <Row>
      {enableEdit ? (
        <UserProfileEdit
          closeEdit={toggleEdit}
          refreshUserProfileData={refreshUserProfileData}
          id={userData.id}
          role={userData.role}
          userName={userData.username}
          email={userData.email}
          address={userData.address}
          picture={userData.picture}
        />
      ) : (
        <div className="mb-5 mt-5" lg="2" sm="4">
          <Button onClick={toggleEdit}>Editar Datos</Button>
          <Link to={"/Articles"}>
            <Button>Volver</Button>
          </Link>
          <div>Nombre del Usuario: {userData.username}</div>
          <div>Email: {userData.email}</div>
          <div>Direccion: {userData.address}</div>
          <Image
            className="avatar-aspect-ratio"
            src={userData.picture}
            alt="Missing User Avatar."
          />
        </div>
      )}
    </Row>
  );
};
