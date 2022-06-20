import { Form } from "react-bootstrap";

const preventSubmit = (event) => event.preventDefault();

export const Filter = ({ filter, setFilter, placeholder }) => {
  return (
    <Form onSubmit={preventSubmit}>
      <Form.Control
        onChange={setFilter}
        value={filter}
        type="Filtrar por usuario."
        placeholder={placeholder}
      />
    </Form>
  );
};
