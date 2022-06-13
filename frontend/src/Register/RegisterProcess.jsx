import { Alert, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTextInput } from "../SharedHooks/customHooks";

export const Register = ({ setToken, originalPath }) => {
  const [username, setUsername] = useTextInput("");
  const [password, setPassword] = useTextInput("");
  const [email, setEmail] = useTextInput("");
  const [address, setAddress] = useTextInput("");
  const [errorStatus, setErrorStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, address, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        navigate(originalPath);
      } else {
        throw await response.text();
      }
    } catch (error) {
      setErrorStatus(error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          onChange={setUsername}
          value={username}
          type="text"
          placeholder="username"
        />
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          onChange={setPassword}
          value={password}
          type="text"
          placeholder="********"
        />
        <Form.Label>Email</Form.Label>
        <Form.Control
          onChange={setEmail}
          value={email}
          type="text"
          placeholder="user@mail.com"
        />
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          onChange={setAddress}
          value={address}
          type="text"
          placeholder="address"
        />
        <Form.Control className="nt-3" type="submit" />
      </Form>
      {errorStatus && (
        <Alert variant="danger" onClose={() => setErrorStatus("")} dismissible>
          <Alert.Heading>{errorStatus}</Alert.Heading>
        </Alert>
      )}
    </>
  );
};
