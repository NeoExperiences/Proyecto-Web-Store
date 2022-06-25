import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {
  useTextInput,
  useUserData,
  useUserPrivilege,
} from "../../SharedHooks/customHooks";

export const ReplyCard = ({
  replyUserName,
  userReply,
  userID,
  refreshReplies,
  articleID,
  commentID,
  replyID,
  replyDate,
  userPicture,
}) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [editedReply, setEditedReply] = useTextInput(userReply);
  const originalCommenter = userID === useUserData().id;
  const isAdmin = useUserPrivilege("admin");

  const updateReply = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/articles/${articleID}/comments/${commentID}/replies/${replyID}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userReply: editedReply }),
        }
      );
      if (response.ok) {
        toggleEdit();
        refreshReplies();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteReply = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:5000/articles/${articleID}/comments/${commentID}/replies/${replyID}`,
        {
          method: "delete",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Successful Deletion.");
        refreshReplies();
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
    <Container className="container-reply-removepadding">
      <Card border="light" className="reply-card-properties">
        {enableEdit ? (
          <Form onSubmit={updateReply}>
            <Container className="container-embolden">
              {replyUserName} responde:
            </Container>
            <Container>{replyDate}</Container>
            <Button onClick={toggleEdit}>Cerrar</Button>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                onChange={setEditedReply}
                value={editedReply}
                rows={5}
              />
              <Form.Control className="nt-3" type="submit" />
            </Form.Group>
          </Form>
        ) : (
          <>
            <Card.Header>
              <Container className="container-embolden">
                <Image
                  className="avatar-aspect-ratio"
                  src={userPicture}
                  roundedCircle={true}
                  width="40"
                  height="40"
                  alt="Missing user avatar."
                />{" "}
                {replyUserName} responde:
              </Container>
              <Container>{replyDate}</Container>
              {(isAdmin || originalCommenter) && (
                <Container>
                  <Button onClick={toggleEdit}>Editar</Button>
                  <Button onClick={deleteReply}>Borrar</Button>
                </Container>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title>{userReply}</Card.Title>
            </Card.Body>
          </>
        )}
      </Card>
    </Container>
  );
};
