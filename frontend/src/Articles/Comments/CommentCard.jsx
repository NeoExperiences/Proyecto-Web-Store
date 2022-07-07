import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
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
  userPicture,
}) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [editedComment, setEditedComment] = useTextInput(userComment);
  const originalCommenter = userID === useUserData().id;
  const isAdmin = useUserPrivilege("admin");
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetchReplies(articleID, commentID).then((replies) => setReplies(replies));
  }, [articleID, commentID]);

  const refreshReplies = () => {
    fetchReplies(articleID, commentID).then((replies) => setReplies(replies));
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

  const deletePost = async () => {
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
    refreshComments();
  };

  const toggleEdit = () => {
    if (enableEdit) setEnableEdit(false);
    else setEnableEdit(true);
  };

  return (
    <Container>
      <Card border="light" className="comment-card-properties">
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
            <Image
              as={Button}
              onClick={toggleEdit}
              src="https://i.imgur.com/Xd7YYnx.png"
              alt="Edit Button"
            />
          </Form>
        ) : (
          <>
            <Card.Header>
              <Row>
                <Col
                  className="container-embolden"
                  xs
                  lg="8"
                  style={{ width: "91%", paddingLeft: "100px" }}
                >
                  <Image
                    className="avatar-aspect-ratio"
                    src={userPicture}
                    roundedCircle={true}
                    width="40"
                    height="40"
                    alt="Missing user avatar."
                  />{" "}
                  {userName} dice:
                  <Container>{commentDate} </Container>
                </Col>
                <Col lg="1">
                  {(isAdmin || originalCommenter) && (
                    <>
                      <Container>
                        <Image
                          as={Button}
                          onClick={toggleEdit}
                          src="https://i.imgur.com/jU2LXB6.png"
                          alt="Edit Button"
                        />
                      </Container>
                      <Container>
                        <Image
                          as={Button}
                          onClick={deletePost}
                          src="https://i.imgur.com/gmeQ1YS.png"
                          alt="Delete Button"
                        />
                      </Container>
                    </>
                  )}
                </Col>
              </Row>
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
      </Card>
      {replies.map(
        ({ id, replyUserName, userID, userReply, replyDate, userPicture }) => (
          <Row key={id}>
            <Col md={{ span: 9, offset: 3 }} className="reply-border">
              <ReplyCard
                refreshReplies={refreshReplies}
                commentID={commentID}
                articleID={articleID}
                replyUserName={replyUserName}
                userID={userID}
                userReply={userReply}
                replyDate={replyDate}
                replyID={id}
                userPicture={userPicture}
              ></ReplyCard>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};
