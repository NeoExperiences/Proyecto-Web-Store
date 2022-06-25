import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchComments } from "./helpers";
import { CommentCard } from "./CommentCard";
import { Col } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { CommentBox } from "./CommentBox";

export const CommentList = () => {
  const { id: articleID } = useParams();
  const [comments, setComments] = useState([]);
  const refreshComments = () => {
    fetchComments(articleID).then((comments) =>
      setComments(comments.reverse())
    );
  };
  useEffect(() => {
    fetchComments(articleID).then((comments) =>
      setComments(comments.reverse())
    );
  }, [articleID]);

  return (
    <Container>
      <CommentBox
        articleID={articleID}
        refreshComments={refreshComments}
      ></CommentBox>
      {comments.map(
        ({
          userName,
          userID,
          userComment,
          commentID,
          commentDate,
          userPicture,
        }) => (
          <Row key={commentID}>
            <Col className="mb-1 mt-1">
              <CommentCard
                classname="reply-rule"
                refreshComments={refreshComments}
                commentID={commentID}
                articleID={articleID}
                userName={userName}
                userID={userID}
                userComment={userComment}
                commentDate={commentDate}
                userPicture={userPicture}
              ></CommentCard>
            </Col>
          </Row>
        )
      )}
    </Container>
  );
};
