export const fetchComments = (id) => {
    return fetch(`http://localhost:5000/articles/${id}/comments`)
        .then(response => response.json())
}
