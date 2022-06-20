export const fetchComments = (id) => {
    return fetch(`http://localhost:5000/articles/${id}/comments`)
        .then(response => response.json())
}

export const fetchReplies = (id, commentid) => {
    return fetch(`http://localhost:5000/articles/${id}/comments/${commentid}/replies`)
        .then(response => response.json())
}