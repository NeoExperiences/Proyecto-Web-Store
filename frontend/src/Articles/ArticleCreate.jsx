import { Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTextInput, useUserData } from "../SharedHooks/customHooks";

export const ArticleCreate = () => {
  const navigate = useNavigate();
  const [createdPostTitle, setCreatedPostTitle] = useTextInput("");
  const [createdPost, setCreatedPost] = useTextInput("");
  const userID = useUserData().id;

  const createPost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/articles/`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postName: createdPostTitle,
          postContent: createdPost,
          userID: userID,
          picture: "",
        }),
      });
      if (response.ok) {
        const { id } = await response.json();
        console.log(response.body);
        navigate(`/articles/${id}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container data-testid="creating-post">
      <Form onSubmit={createPost}>
        <Form.Group className="mb-3">
          <Form.Control
            onChange={setCreatedPostTitle}
            value={createdPostTitle}
            rows={5}
          />
          <Form.Control
            as="textarea"
            onChange={setCreatedPost}
            value={createdPost}
            rows={5}
          />
          <Form.Control className="nt-3" type="submit" />
        </Form.Group>
      </Form>
    </Container>
  );
};
