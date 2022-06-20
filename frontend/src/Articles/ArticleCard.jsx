import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ArticleCard = ({
  id,
  userName,
  postName,
  picture,
  postDate,
  categoryName,
  categoryID,
}) => (
  <Card border="light">
    <Card.Header>
      {userName}
      <Container>{categoryName}</Container>
      <Container>{postDate}</Container>
    </Card.Header>
    <Card.Body>
      <Card.Title>{postName}</Card.Title>
      <Card.Text src={picture} alt="Missing Picture." />
      <Link to={`/Articles/${id}`}>
        <Button>Ir al articulo</Button>
      </Link>
    </Card.Body>
  </Card>
);
