
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";


export const ArticleCard = ({id, userName, postName, picture}) => 
<Card border="light">
    <Card.Header>{userName}</Card.Header>
    <Card.Body>
        <Card.Title>{postName}</Card.Title>
        {/* <Card.Text img src={picture} alt="Missing Picture."/> */}
        <Link to={`/Articles/${id}`}><Button>Ir al articulo</Button></Link>
    </Card.Body>
</Card>