const { db } = require('../../../db/connect')

// const getAllReplies = async () => {
//     return await db.query(`
//         SELECT comment.postID, comment.userID, comment.userComment, user.id
//         FROM comentarios comment
//         JOIN usuarios user ON comment.userID = user.id
//         JOIN articulos post ON comment.postID = post.id
//     `, {
//         type: db.QueryTypes.SELECT
//     })   
// }

const getCommentReplies = async commentid => {
    try{
        const replies = await db.query(`
            SELECT reply.id, reply.postID, reply.userID, reply.commentID, reply.userReply, users.username as replyUserName, reply.replyDate
            FROM respuestas reply
            JOIN usuarios users ON reply.userID = users.id
            WHERE reply.commentID = :commentid
        `, {
            type: db.QueryTypes.SELECT,
            replacements: { commentid }
        })
        return { replies }
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const deleteReply = async id => {
    await db.query(`
        DELETE FROM respuestas WHERE id = :id;
    `, {
        replacements: { id }
    })
}

const updateReply = async reply => {
    try{
        const [, modified] = await db.query(`
            UPDATE respuestas SET
                userReply = :userReply
            WHERE id = :id
        `, {
            type: db.QueryTypes.SELECT,
            replacements: reply
        })
        return modified > 0
    } catch (error) {
        console.log(error)
        return { error }
    }
}

const addReply = async reply => {
    try{
        const [id] = await db.query(`
        INSERT INTO respuestas (userReply, userID, postID, commentID, replyDate) VALUES
            (:userReply, :userID, :postID, :commentID, :replyDate)
        `, {
            replacements: reply
        })

        return { createdReply:{...reply, id}}
    } catch (error) {
        console.log(error)
        return { error }
}
}

module.exports = {
    getCommentReplies,
    addReply,
    updateReply,
    deleteReply
}