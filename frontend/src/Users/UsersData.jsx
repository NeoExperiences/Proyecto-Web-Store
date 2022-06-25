import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useUserPrivilege } from "../SharedHooks/customHooks";
import { UserRow } from "./UserRow";

export const UsersData = () => {
  const isAdmin = useUserPrivilege("admin");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/users/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((users) => setUsers(users));
  }, []);

  const refreshUsers = () => {
    fetch(`http://localhost:5000/users/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
      },
    })
      .then((response) => (response.ok ? response.json() : {}))
      .then((users) => setUsers(users));
  };

  return (
    <>
      {isAdmin && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Address</th>
              <th>Picture</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(
              ({ id, username, email, address, role, roleName, picture }) => (
                <UserRow
                  key={id}
                  id={id}
                  username={username}
                  email={email}
                  address={address}
                  roleName={roleName}
                  role={role}
                  picture={picture}
                  refreshUsers={refreshUsers}
                />
              )
            )}
          </tbody>
        </Table>
      )}
    </>
  );
};
