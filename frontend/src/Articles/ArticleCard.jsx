import { Card, Image, Row, Col } from "react-bootstrap";
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
  const truncateUserName = (userName) => {
    if (userName.length > 20) {
      return userName.slice(0, 20 - 3) + "...";
    } else {
      return userName;
    }
  };

  const truncatePost = (postContent) => {
    if (postContent.length > 100) {
      return postContent.slice(0, 100 - 3) + "...";
    } else {
      return postContent;
    }
  };

  const truncatePostTitle = (postName) => {
    if (postName.length > 50) {
      return postName.slice(0, 50 - 3) + "...";
    } else {
      return postName;
    }
  };

  const truncatePostDate = (postDate) => {
    return postDate.slice(0, 10);
  };

  return (
    <Link
      to={`/Articles/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card border="light" className="article-card-shadow">
        <Card.Header>
          <Card.Title>
            <Row>
              <Col
                xs
                lg="2"
                style={{ fontWeight: "10", justifyContent: "center" }}
              >
                <Image
                  className="avatar-aspect-ratio"
                  src={userPicture}
                  roundedCircle={true}
                  width="40"
                  height="40"
                  alt="missing picture"
                />{" "}
                {truncateUserName(userName)}
              </Col>
              <Col xs lg="9">
                {truncatePostTitle(postName)}
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Text />
          <Row>
            <Col>
              <Row style={{ justifyContent: "center" }}>
                {truncatePost(postContent)}
                {"   "}
              </Row>
              {truncatePostDate(postDate)}
              {"   "}
              {categoryName}
            </Col>
            <Col>
              <Image
                src={picture}
                style={{ height: "auto", width: "150px" }}
                alt="Missing Picture."
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Link>
  );
};
