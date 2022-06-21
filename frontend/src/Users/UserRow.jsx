import { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useTextInput } from "../SharedHooks/customHooks";

export const UserRow = ({
  id,
  username,
  email,
  address,
  roleName,
  role,
  refreshUsers,
}) => {
  const [editedUsername, setEditedUsername] = useTextInput(username);
  const [editedEmail, setEditedEmail] = useTextInput(email);
  const [editedAddress, setEditedAddress] = useTextInput(address);
  const [editedRole, setEditedRole] = useTextInput(role);
  const [enableEdit, setEnableEdit] = useState(false);
  const valuesHaveChanged =
    username !== editedUsername ||
    email !== editedEmail ||
    address !== editedAddress ||
    role !== +editedRole;

  const submitDeleteUser = (id) => {
    return async (event) => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
          },
        });

        if (response.ok) {
          console.log("Deletion Complete");
        } else {
          throw await response.text();
        }
      } catch (error) {}
    };
  };

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: editedUsername,
          email: editedEmail,
          address: editedAddress,
          role: editedRole,
        }),
      });
      if (response.ok) {
        toggleEdit();
        refreshUsers();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleEdit = () => {
    if (enableEdit) setEnableEdit(false);
    else setEnableEdit(true);
  };

  return (
    <tr>
      <td>
        {!enableEdit ? (
          username
        ) : (
          <Form.Control
            type="text"
            onChange={setEditedUsername}
            value={editedUsername}
          />
        )}
      </td>
      <td>
        {!enableEdit ? (
          email
        ) : (
          <Form.Control
            type="text"
            onChange={setEditedEmail}
            value={editedEmail}
          />
        )}
      </td>
      <td>
        {!enableEdit ? (
          address
        ) : (
          <Form.Control
            type="text"
            onChange={setEditedAddress}
            value={editedAddress}
          />
        )}
      </td>
      <td>
        {!enableEdit ? (
          roleName
        ) : (
          <Form.Select
            value={editedRole}
            onChange={setEditedRole}
            aria-label="User Role."
          >
            <option value={1}>admin</option>
            <option value={2}>client</option>
          </Form.Select>
        )}
      </td>
      <td>
        {!enableEdit ? (
          <>
            <Button onClick={submitDeleteUser(id)}>Borrar</Button>
            <Button onClick={toggleEdit}>Editar</Button>
          </>
        ) : (
          <>
            <Button disabled={!valuesHaveChanged} onClick={updateUser}>
              Guardar
            </Button>
            <Button onClick={toggleEdit}>Cancelar</Button>
          </>
        )}
      </td>
    </tr>
  );
};
