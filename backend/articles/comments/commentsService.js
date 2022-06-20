const { db } = require('../../db/connect')

const getAllComments = async () => {
    return await db.query(`
        SELECT comment.postID, comment.userID, comment.userComment, user.id
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
            SELECT comment.postID, comment.userID, comment.userComment, users.username as userName, comment.id as commentID, comment.commentDate
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

const deleteComment = async id => {
    await db.query(`
        DELETE FROM comentarios WHERE id = :id;
    `, {
        replacements: { id }
    })
}

const updateComment = async comment => {
    try{
        const [, modified] = await db.query(`
            UPDATE comentarios SET
                userComment = :userComment
            WHERE id = :id
        `, {
            type: db.QueryTypes.SELECT,
            replacements: comment
        })
        return modified > 0
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const addComment = async comment => {
    try{
        const [id] = await db.query(`
        INSERT INTO comentarios (userComment, userID, postID, commentDate) VALUES
            (:userComment, :userID, :postID, :commentDate)
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
    addComment,
    updateComment,
    deleteComment
}