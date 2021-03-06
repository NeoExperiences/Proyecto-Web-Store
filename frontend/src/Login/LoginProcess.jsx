import { useState } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTextInput } from "../SharedHooks/customHooks";

export const Login = ({ setToken, originalPath }) => {
  const [username, setUsername] = useTextInput("");
  const [password, setPassword] = useTextInput("");
  const [errorStatus, setErrorStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
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
    <Container data-testid="login-page">
      <Form onSubmit={handleSubmit}>
        <div>Logearse</div>
        <div />
        <div />
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
          type="password"
          id="inputPassword5"
          placeholder="********"
        />
        <Form.Control className="nt-3" type="submit" />
      </Form>
      {errorStatus && (
        <Alert variant="danger" onClose={() => setErrorStatus("")} dismissible>
          <Alert.Heading>{errorStatus}</Alert.Heading>
        </Alert>
      )}
    </Container>
  );
};
