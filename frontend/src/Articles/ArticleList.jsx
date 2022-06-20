import { Button, Card, Col, Container, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useTextInput } from "../SharedHooks/customHooks";
import { Filter } from "./ArticleFilterByText";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";
import { useUserPrivilege } from "../SharedHooks/customHooks";
import { FilterByCategory } from "./ArticleFilterByCategory";

export const ArticleList = () => {
  const [articleList, setArticleList] = useState([]);
  const [filterByAuthor, setFilterByAuthor] = useTextInput("");
  const [filterByTitle, setFilterByTitle] = useTextInput("");
  const [enableFilterByAuthor, setEnableFilterByAuthor] = useState(false);
  const [enableFilterByTitle, setEnableFilterByTitle] = useState(false);
  const [enableFilterByCategory, setEnableFilterByCategory] = useState(false);
  const [categoryFilter, setCategoryFilter] = useTextInput("");
  const [categoryList, setCategoryList] = useState([]);
  const isAdmin = useUserPrivilege("admin");

  const filteredByAuthor = articleList.filter((article) =>
    article.userName?.includes(filterByAuthor)
  );

  const filteredByTitle = articleList.filter((article) =>
    article.postName?.includes(filterByTitle)
  );

  const filteredByCategory = articleList.filter(
    (article) => article.categoryID === +categoryFilter
  );

  useEffect(() => {
    fetch(`http://localhost:5000/articles`)
      .then((response) => (response.ok ? response.json() : []))
      .then((articles) =>
        setArticleList([].concat(articles).slice(0, 51).reverse())
      );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/categories`)
      .then((response) => (response.ok ? response.json() : []))
      .then((category) => setCategoryList([].concat(category)));
  }, []);

  const toggleFilterByAuthor = () => {
    if (enableFilterByAuthor) setEnableFilterByAuthor(false);
    else setEnableFilterByAuthor(true);
  };
  const toggleFilterByTitle = () => {
    if (enableFilterByTitle) setEnableFilterByTitle(false);
    else setEnableFilterByTitle(true);
  };
  const toggleFilterByCategory = () => {
    if (enableFilterByCategory) setEnableFilterByCategory(false);
    else setEnableFilterByCategory(true);
  };

  return (
    <Container fluid>
      {isAdmin && (
        <Link to={"/Post"}>
          <Button>Crear Articulo</Button>
        </Link>
      )}
      {enableFilterByAuthor && (
        <Row>
          <Col>
            <Filter
              filter={filterByAuthor}
              setFilter={setFilterByAuthor}
              placeholder="Autor:"
            />
          </Col>
        </Row>
      )}
      {enableFilterByTitle && (
        <Row>
          <Col>
            <Filter
              filter={filterByTitle}
              setFilter={setFilterByTitle}
              placeholder="Nombre del Articulo:"
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col md={{ span: 3, offset: 9 }}>
          <Card border="light">
            <Card.Header>Filtrar por:</Card.Header>
            <Card.Body>
              {!enableFilterByCategory && !enableFilterByTitle && (
                <Button onClick={toggleFilterByAuthor}>Autor</Button>
              )}
              {!enableFilterByAuthor && !enableFilterByTitle && (
                <Button onClick={toggleFilterByCategory}>Categoria</Button>
              )}
              {!enableFilterByAuthor && !enableFilterByCategory && (
                <Button onClick={toggleFilterByTitle}>Titulo</Button>
              )}
              {enableFilterByCategory && (
                <FilterByCategory
                  filter={categoryFilter}
                  setFilter={setCategoryFilter}
                  categoryList={categoryList}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
        {!enableFilterByAuthor &&
          !enableFilterByCategory &&
          !enableFilterByTitle && (
            <>
              {articleList.map(
                ({
                  id,
                  userName,
                  postName,
                  picture,
                  postDate,
                  categoryName,
                }) => (
                  <Col className="mb-5 mt-5" key={id} lg="8" sm="12">
                    <ArticleCard
                      id={id}
                      userName={userName}
                      postName={postName}
                      picture={picture}
                      postDate={postDate}
                      categoryName={categoryName}
                    />
                  </Col>
                )
              )}
            </>
          )}
        {enableFilterByAuthor &&
          !enableFilterByCategory &&
          !enableFilterByTitle && (
            <>
              {filteredByAuthor.map(
                ({
                  id,
                  userName,
                  postName,
                  picture,
                  postDate,
                  categoryName,
                }) => (
                  <Col className="mb-5 mt-5" key={id} lg="8" sm="12">
                    <ArticleCard
                      id={id}
                      userName={userName}
                      postName={postName}
                      picture={picture}
                      postDate={postDate}
                      categoryName={categoryName}
                    />
                  </Col>
                )
              )}
            </>
          )}
        {enableFilterByCategory &&
          !enableFilterByAuthor &&
          !enableFilterByTitle && (
            <>
              {filteredByCategory.map(
                ({
                  id,
                  userName,
                  postName,
                  picture,
                  postDate,
                  categoryName,
                }) => (
                  <Col className="mb-5 mt-5" key={id} lg="8" sm="12">
                    <ArticleCard
                      id={id}
                      userName={userName}
                      postName={postName}
                      picture={picture}
                      postDate={postDate}
                      categoryName={categoryName}
                    />
                  </Col>
                )
              )}
            </>
          )}
        {!enableFilterByCategory &&
          !enableFilterByAuthor &&
          enableFilterByTitle && (
            <>
              {filteredByTitle.map(
                ({
                  id,
                  userName,
                  postName,
                  picture,
                  postDate,
                  categoryName,
                }) => (
                  <Col className="mb-5 mt-5" key={id} lg="8" sm="12">
                    <ArticleCard
                      id={id}
                      userName={userName}
                      postName={postName}
                      picture={picture}
                      postDate={postDate}
                      categoryName={categoryName}
                    />
                  </Col>
                )
              )}
            </>
          )}
      </Row>
    </Container>
  );
};
