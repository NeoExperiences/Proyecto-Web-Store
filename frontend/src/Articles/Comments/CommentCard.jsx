import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Card } from "react-bootstrap";
import {
  useTextInput,
  useUserData,
  useUserPrivilege,
} from "../../SharedHooks/customHooks";
import { fetchReplies } from "./helpers";
import { ReplyBox } from "./ReplyBox";
import { ReplyCard } from "./ReplyCard";

export const CommentCard = ({
  userName,
  userComment,
  userID,
  refreshComments,
  articleID,
  commentID,
  commentDate,
}) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [editedComment, setEditedComment] = useTextInput(userComment);
  const originalCommenter = userID === useUserData().id;
  const isAdmin = useUserPrivilege("admin");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetchReplies(articleID, commentID).then((replies) =>
      setReplies(replies.reverse())
    );
  }, [articleID, commentID]);

  const refreshReplies = () => {
    fetchReplies(articleID, commentID).then((replies) =>
      setReplies(replies.reverse())
    );
  };

  const updateComment = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/articles/${articleID}/comments/${commentID}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userComment: editedComment }),
        }
      );
      if (response.ok) {
        toggleEdit();
        refreshComments();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deletePost = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:5000/articles/${articleID}/comments/${commentID}`,
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
        refreshComments();
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
    <Container>
      <Card border="light">
        {enableEdit ? (
          <Form onSubmit={updateComment}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                onChange={setEditedComment}
                value={editedComment}
                rows={5}
              />
              <Form.Control className="nt-3" type="submit" />
            </Form.Group>
          </Form>
        ) : (
          <>
            <Card.Header>
              <Container>{commentDate}</Container>
              {userName} dice:
              {(isAdmin || originalCommenter) && (
                <Container>
                  <Button onClick={toggleEdit}>Editar</Button>
                  <Button onClick={deletePost}>Borrar</Button>
                </Container>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Title>{userComment}</Card.Title>
              <ReplyBox
                articleID={articleID}
                commentID={commentID}
                refreshReplies={refreshReplies}
              />
            </Card.Body>
          </>
        )}
        {replies.map(({ id, replyUserName, userID, userReply, replyDate }) => (
          <Row key={id}>
            <Col md={{ span: 9, offset: 3 }}>
              <ReplyCard
                refreshReplies={refreshReplies}
                commentID={commentID}
                articleID={articleID}
                replyUserName={replyUserName}
                userID={userID}
                userReply={userReply}
                replyDate={replyDate}
                replyID={id}
              ></ReplyCard>
            </Col>
          </Row>
        ))}
      </Card>
    </Container>
  );
};
