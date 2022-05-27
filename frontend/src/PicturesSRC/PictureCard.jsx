import { useState } from "react";
import { Button, Modal } from "react-bootstrap"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Example({downloadSrc}) {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Open Modal
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img src={downloadSrc}  alt="Lorem Ipsum"/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

export const PictureCard = ({ id, thumbnailUrl, title}) => {
    const navigate = useNavigate()
    return(
    <Card style={{ width: '18rem' }}  className="mb-5 mt-5" data-testid="picture-card">
    <Card.Img variant="top" src={thumbnailUrl} onClick={ () => navigate(`/Pictures/${id}`) } />
    <Card.Body>
      {title? <>
        <Card.Title>{id}</Card.Title>
        <Card.Text>
        {title}
        </Card.Text>
        <Button variant="primary" href={thumbnailUrl}>Fetch the Original</Button>
        <Example downloadSrc={thumbnailUrl}/>
        { id && <Link to={`/Pictures/${id}`}><Button>View Details</Button></Link> }
        </>
        : <div data-testid="picture-card-missing-props"></div>}
    </Card.Body>
    </Card>
    )
}



