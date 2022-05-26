const { db } = require('../../db/connect')

const getAllComments = async () => {
    return await db.query(`
        SELECT comment.postID, comment.userID, comment.userComment
        FROM comentarios comment
        JOIN usuarios user ON comment.userID = user.id
        JOIN articulos post ON comment.postID = post.id
    `, {
        type: db.QueryTypes.SELECT
    })   
}

const getPostComments = async articleid => {
    try{
        const comments = await db.query(`
            SELECT comment.postID, comment.userID, comment.userComment, users.username as userName, comment.id as commentID
            FROM comentarios comment
            JOIN usuarios users ON comment.userID = users.id
            WHERE comment.postID = :articleid
        `, {
            type: db.QueryTypes.SELECT,
            replacements: { articleid }
        })
        return { comments }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const addComment = async comment => {
    try{
        const [id] = await db.query(`
        INSERT INTO comentarios (userComment, userID, postID) VALUES
            (:userComment, :userID, :postID)
        `, {
            replacements: comment
        })

        return { createdComment:{...comment, id}}
    } catch (error) {
        console.log(error)
        return { error }
}
}

module.exports = {
    getAllComments,
    getPostComments,
    addComment
}