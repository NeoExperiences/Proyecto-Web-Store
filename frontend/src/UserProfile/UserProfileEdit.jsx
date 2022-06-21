import { Button, Form } from "react-bootstrap";
import { useTextInput } from "../SharedHooks/customHooks";

export const UserProfileEdit = ({
  userName,
  email,
  address,
  id,
  role,
  closeEdit,
  refreshUserProfileData,
}) => {
  const [editedUserName, setEditedUserName] = useTextInput(userName);
  const [editedEmail, setEditedEmail] = useTextInput(email);
  const [editedAddress, setEditedAddress] = useTextInput(address);

  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/change/${id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: editedUserName,
          email: editedEmail,
          address: editedAddress,
        }),
      });
      if (response.ok) {
        closeEdit();
        refreshUserProfileData();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form onSubmit={updateUser}>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          onChange={setEditedUserName}
          value={editedUserName}
          rows={1}
        />
        <Form.Control
          as="textarea"
          onChange={setEditedEmail}
          value={editedEmail}
          rows={1}
        />
        <Form.Control
          as="textarea"
          onChange={setEditedAddress}
          value={editedAddress}
          rows={1}
        />
        <Form.Control className="nt-3" type="submit" />
      </Form.Group>
      <Button onClick={closeEdit}>Cancelar</Button>
    </Form>
  );
};
