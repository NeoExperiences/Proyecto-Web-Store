
export const fetchArticle = (id) => {
    return fetch(`http://localhost:5000/articles/${id}`)
        .then(response => response.json())
}
