import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { UserRow } from "./UserRow";

export const UsersData = () => {
  const [users, setUsers] = useState([]);

  const refreshUsers = () => {
    fetch(`http://localhost:5000/users/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((users) => setUsers(users));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((users) => setUsers(users));
  }, []);

  return (
    // <Container>{userData.map( ({username, email, address}) =>
    //     <Row style={{textAlign:"justify"}}>
    //         <Col>Username: {username}</Col>
    //         <Col>Email: {email}</Col>
    //         <Col>Address: {address}</Col>
    //         <Col><Link to={"/Articles"}><Button>Volver</Button></Link></Col>
    //     </Row>)}
    // </Container>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, username, email, address, role, roleName }) => (
          <UserRow
            key={id}
            id={id}
            username={username}
            email={email}
            address={address}
            roleName={roleName}
            role={role}
            refreshUsers={refreshUsers}
          />
        ))}
      </tbody>
    </Table>
  );
};
