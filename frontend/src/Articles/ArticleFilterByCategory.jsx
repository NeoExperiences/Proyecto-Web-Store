import { Form } from "react-bootstrap";

export const FilterByCategory = ({ filter, setFilter, categoryList }) => {
  return (
    <Form.Select aria-label="Default select example" onChange={setFilter}>
      <option>Elija una categoria</option>
      {categoryList?.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </Form.Select>
  );
};
