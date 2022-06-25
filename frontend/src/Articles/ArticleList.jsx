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
    <Container>
      <Row>
        <Col>
          <Row padding-right="0">
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
                      userPicture,
                      postContent,
                    }) => (
                      <Col className="mb-2 mt-2" key={id} lg="12" sm="12">
                        <ArticleCard
                          id={id}
                          userName={userName}
                          postContent={postContent}
                          postName={postName}
                          picture={picture}
                          postDate={postDate}
                          categoryName={categoryName}
                          userPicture={userPicture}
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
                      userPicture,
                      postContent,
                    }) => (
                      <Col className="mb-5 mt-5" key={id} lg="12" sm="12">
                        <ArticleCard
                          id={id}
                          userName={userName}
                          postName={postName}
                          postContent={postContent}
                          picture={picture}
                          postDate={postDate}
                          categoryName={categoryName}
                          userPicture={userPicture}
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
                      userPicture,
                      postContent,
                    }) => (
                      <Col className="mb-5 mt-5" key={id} lg="12" sm="12">
                        <ArticleCard
                          id={id}
                          userName={userName}
                          postName={postName}
                          postContent={postContent}
                          picture={picture}
                          postDate={postDate}
                          categoryName={categoryName}
                          userPicture={userPicture}
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
                      postContent,
                      picture,
                      postDate,
                      categoryName,
                      userPicture,
                    }) => (
                      <Col className="mb-5 mt-5" key={id} lg="12" sm="12">
                        <ArticleCard
                          id={id}
                          userName={userName}
                          postName={postName}
                          postContent={postContent}
                          picture={picture}
                          postDate={postDate}
                          categoryName={categoryName}
                          userPicture={userPicture}
                        />
                      </Col>
                    )
                  )}
                </>
              )}
          </Row>
        </Col>
        <Col xs lg="3">
          <Card className="fixed-column" border="light" lg="12" sm="12">
            <Card.Header>Filtrar por:</Card.Header>
            <Card.Body>
              <Row>
                {!enableFilterByCategory && !enableFilterByTitle && (
                  <Button onClick={toggleFilterByAuthor}>Autor</Button>
                )}
              </Row>
              <Row>
                {!enableFilterByAuthor && !enableFilterByCategory && (
                  <Button onClick={toggleFilterByTitle}>Titulo</Button>
                )}
              </Row>
              <Row>
                {!enableFilterByAuthor && !enableFilterByTitle && (
                  <Button onClick={toggleFilterByCategory}>Categoria</Button>
                )}
              </Row>
              <Row>
                {enableFilterByCategory && (
                  <FilterByCategory
                    filter={categoryFilter}
                    setFilter={setCategoryFilter}
                    categoryList={categoryList}
                  />
                )}
              </Row>
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
            </Card.Body>
          </Card>

          {isAdmin && (
            <Card
              className="fixed-create-article"
              border="light"
              lg="12"
              sm="12"
            >
              <Card.Body>
                <Link to={"/Post"}>
                  <Row>
                    <Button>Crear Articulo</Button>
                  </Row>
                </Link>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};
