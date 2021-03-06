import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  useTextInput,
  useUserData,
  useUserPrivilege,
} from "../SharedHooks/customHooks";
import { CommentList } from "./Comments/CommentList";
import { fetchArticle } from "./helpers";

export const ArticleRead = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [editedPostTitle, setEditedPostTitle] = useTextInput("");
  const [editedPostPicture, setEditedPostPicture] = useTextInput("");
  const [editedPost, setEditedPost] = useTextInput("");
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    fetchArticle(id).then((article) => {
      setArticle(article);
      setEditedPostTitle({ target: { value: article?.postName } });
      setEditedPostPicture({ target: { value: article?.picture } });
      setEditedPost({ target: { value: article?.postContent } });
    });
  }, [id, setEditedPost, setEditedPostPicture, setEditedPostTitle]);

  const refreshPost = () => {
    fetchArticle(id).then((article) => {
      setArticle(article);
      setEditedPostTitle({ target: { value: article?.postName } });
      setEditedPost({ target: { value: article?.postContent } });
    });
  };

  const originalPoster = article?.userid === useUserData().id;
  const isAdmin = useUserPrivilege("admin");
  const postPrivilige = originalPoster || isAdmin;

  const updatePost = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/articles/${id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postName: editedPostTitle,
          postContent: editedPost,
          picture: editedPostPicture,
        }),
      });
      if (response.ok) {
        toggleEdit();
        refreshPost();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const deletePost = async (event) => {
    try {
      const response = await fetch(`http://localhost:5000/articles/${id}`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenStorage")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ editedPostTitle, editedPost }),
      });
      if (response.ok) {
        console.log("Successful Deletion.");
        navigate(`/articles`);
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
    <>
      {postPrivilige && (
        <Container data-testid="original-poster" style={{ textAlign: "right" }}>
          <Button variant="warning" onClick={toggleEdit}>
            Editar
          </Button>
          <Button variant="warning" onClick={deletePost}>
            Borrar
          </Button>
          {enableEdit && (
            <Form onSubmit={updatePost}>
              <Form.Group className="mb-3">
                <Form.Control
                  onChange={setEditedPostTitle}
                  value={editedPostTitle}
                  rows={5}
                />
                <Form.Control
                  onChange={setEditedPostPicture}
                  value={editedPostPicture}
                  rows={5}
                />
                <Form.Control
                  as="textarea"
                  onChange={setEditedPost}
                  value={editedPost}
                  rows={5}
                />
                <Form.Control className="nt-3" type="submit" />
              </Form.Group>
            </Form>
          )}
        </Container>
      )}

      {enableEdit || (
        <>
          {article?.postName ? (
            <>
              <Container data-testid="rendered-article" className="mb-5 mt-5">
                <Row>
                  <Col>
                    <h2>{article?.postName}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Image
                      src={article?.picture}
                      style={{ height: "auto", width: "500px" }}
                      alt=""
                    />
                  </Col>
                </Row>
                <Row className="text-content-wrap mt-3">
                  <Col lg="12" sm="12">
                    <p style={{ textAlign: "justify" }}>
                      {article?.postContent}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <footer style={{ fontWeight: "700" }}>
                      Autor: {article?.userName}
                    </footer>
                    <footer style={{ fontWeight: "700" }}>
                      Categoria: {article?.categoryName}
                    </footer>
                  </Col>
                </Row>
              </Container>
              <CommentList></CommentList>
            </>
          ) : (
            <div data-testid="empty-article"></div>
          )}
        </>
      )}
    </>
  );
};
