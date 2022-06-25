import { Card, Button, Container, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ArticleCard = ({
  id,
  userName,
  postName,
  picture,
  postDate,
  categoryName,
  categoryID,
  userPicture,
  postContent,
}) => {
  const truncatePost = (postContent) => {
    if (postContent.length > 3) {
      if (100 <= 3) {
        return postContent.slice(0, 100 - 3) + "...";
      } else {
        return postContent.slice(0, 100) + "...";
      }
    } else {
      return postContent;
    }
  };

  return (
    <Link
      to={`/Articles/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card border="light" className="article-card-shadow">
        <Card.Header>
          <Row>
            <Col xs lg="2">
              <Image
                className="avatar-aspect-ratio"
                src={userPicture}
                roundedCircle={true}
                width="40"
                height="40"
                alt="missing picture"
              />{" "}
              {userName}
            </Col>
            <Col xs lg="11">
              <Card.Title>{postName}</Card.Title>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Text />
          <Row>
            <Col>
              {truncatePost(postContent)}
              {categoryName}

              {postDate}
            </Col>
            <Col>
              <Image src={picture} alt="Missing Picture." />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Link>
  );
};
