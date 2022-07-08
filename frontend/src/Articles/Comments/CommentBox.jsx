import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useTextInput } from "../../SharedHooks/customHooks";

export const CommentBox = ({ articleID, refreshComments }) => {
  const [userComment, setComment] = useTextInput("");
  const [enableReplyBox, setEnableReplyBox] = useState(false);
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
        setEnableReplyBox(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const toggleBox = () => {
    if (enableReplyBox) setEnableReplyBox(false);
    else setEnableReplyBox(true);
  };

  return (
    <Container>
      {enableReplyBox ? (
        <Form onSubmit={submitComment}>
          <Button variant="warning" onClick={toggleBox}>
            Cerrar
          </Button>
          <Form.Label></Form.Label>
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
      ) : (
        <Container>
          <Button variant="warning" onClick={toggleBox}>
            Comentar
          </Button>
        </Container>
      )}
    </Container>
  );
};
