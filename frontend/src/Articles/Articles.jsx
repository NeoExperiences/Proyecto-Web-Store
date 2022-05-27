import { Route, Routes } from "react-router-dom";
import { ArticleCreate } from "./ArticleCreate";
import { ArticleList } from "./ArticleList";
import { ArticleRead } from "./ArticleRead";

export const Articles = () => {
  return (
    <Routes>
      <Route path="/" element={<ArticleList />} />
      <Route path="/post" element={<ArticleCreate />} />
      <Route path="/:id" element={<ArticleRead />} />
    </Routes>
  );
};
