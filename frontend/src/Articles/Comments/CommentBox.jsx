import { Form } from "react-bootstrap";
import { useTextInput } from "../../SharedHooks/customHooks";

export const CommentBox = ({ articleID, refreshComments }) => {
  const [userComment, setComment] = useTextInput("");
  const submitComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/articles/${articleID}/comments`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userComment }),
        }
      );
      if (response.ok) {
        refreshComments();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form onSubmit={submitComment}>
      <Form.Label>Caja de Comentarios</Form.Label>
      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          onChange={setComment}
          value={userComment}
          rows={5}
        />
        <Form.Control className="nt-3" type="submit" />
      </Form.Group>
    </Form>
  );
};
