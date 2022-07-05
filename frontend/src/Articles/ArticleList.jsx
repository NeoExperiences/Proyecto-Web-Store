import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";

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
  const [articlePage, setArticlePage] = useState([]);
  const [articlePageNumber, setArticlePageNumber] = useState(1);
  const [articleTotalPages, setArticleTotalPages] = useState(0);
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
    fetch(`http://localhost:5000/articles/page`)
      .then((response) => (response.ok ? response.json() : []))
      .then((availableArticles) =>
        setArticleTotalPages(Math.ceil(availableArticles / 10))
      );
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/articles/page/${articlePageNumber}`)
      .then((response) => (response.ok ? response.json() : []))
      .then((pageArticles) =>
        setArticlePage([].concat(pageArticles).reverse())
      );
  }, []);

  const fetchArticlePage = async () => {
    await fetch(`http://localhost:5000/articles/page/${articlePageNumber}`)
      .then((response) => (response.ok ? response.json() : []))
      .then(async (pageArticles) =>
        setArticlePage([].concat(pageArticles).reverse())
      );
  };

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

  const changePage = (number) => {
    setArticlePageNumber(number);
    fetchArticlePage();
  };

  let items = [];
  for (let number = 1; number <= articleTotalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === articlePageNumber}
        onClick={async () => changePage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Container style={{ maxWidth: "1080" }}>
      <Row>
        <Col xs="auto" lg="9" sm="9">
          <Row>
            {!enableFilterByAuthor &&
              !enableFilterByCategory &&
              !enableFilterByTitle && (
                <>
                  {articlePage.map(
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
                  <Col>
                    {" "}
                    <div>
                      <Pagination size="lg">{items}</Pagination>
                      <br />
                    </div>
                  </Col>
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
        <Col xs="auto" lg="3" sm="3">
          <Card className="fixed-column">
            <Card.Header>Filtrar por:</Card.Header>
            <Card.Body>
              <Row>
                {!enableFilterByCategory && !enableFilterByTitle && (
                  <Button
                    onClick={toggleFilterByAuthor}
                    className="filter-button"
                    variant="warning"
                  >
                    Autor
                  </Button>
                )}
              </Row>
              <Row>
                {!enableFilterByAuthor && !enableFilterByCategory && (
                  <Button
                    onClick={toggleFilterByTitle}
                    className="filter-button"
                    variant="warning"
                  >
                    Titulo
                  </Button>
                )}
              </Row>
              <Row>
                {!enableFilterByAuthor && !enableFilterByTitle && (
                  <Button
                    onClick={toggleFilterByCategory}
                    className="filter-button"
                    variant="warning"
                  >
                    Categoria
                  </Button>
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
                <Link
                  to={"/Post"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Row>
                    <Button variant="warning">Crear Articulo</Button>
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
