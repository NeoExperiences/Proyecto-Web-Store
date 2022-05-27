import { Button, Col, Container, Row } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useTextInput } from "../SharedHooks/customHooks";
import { Filter } from "./ArticleFilter";
import { ArticleCard } from "./ArticleCard";
import { Link } from "react-router-dom";

export const ArticleList = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useTextInput("");

  const filteredTitle = list.filter((article) =>
    article.userName?.includes(filter)
  );
  useEffect(() => {
    fetch(`http://localhost:5000/articles`)
      .then((response) => (response.ok ? response.json() : []))
      .then((articles) => setList([].concat(articles).slice(0, 51).reverse()));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Link to={"/Post"}>
            <Button>Crear Articulo</Button>
          </Link>
          <Filter filter={filter} setFilter={setFilter} placeholder="Autor:" />
        </Col>
      </Row>
      <Row>
        {filteredTitle.map(
          ({ id, userName, postName, picture }) => (
            <Col className="mb-5 mt-5" key={id} lg="8" sm="12">
              <ArticleCard
                id={id}
                userName={userName}
                postName={postName}
                picture={picture}
              />
            </Col>
          )
          // ({id, userName, postName, picture}) =>
          // <Col className="mb-5 mt-5"  key={id} lg="2" sm="4">
          //     <div>{postName}</div>
          //     <div><img src={picture} alt="404"/></div>
          //     <div>Autor: {userName}</div>
          //     <Link to={`/Articles/${id}`}><Button>Ir al articulo</Button></Link>
          // </Col>
        )}
      </Row>
    </Container>
  );
};
