const repliesRouter = require('express').Router()

const { verifyUserToken, validateId } = require('../../../shared/middlewares');

const {
    // getAllComments,
    getCommentReplies,
    addReply,
    updateReply,
    deleteReply
} = require('./repliesService');


// commentsRouter.get('/', async (request, response) => {
//     response.status(200).json(await getAllComments())
// })

repliesRouter.get('/', async (request, response) => {
    const {replies, error} = await getCommentReplies(request.commentID)
    if(replies) {
        response.status(200).json(replies)
    } else {
        response.status(400).send("Error al hallar el usuario.")
    }
})

repliesRouter.post('/', verifyUserToken, async (request, response) => {
    const date = new Date()
    const replyRequest = {userReply:request.body.userReply, userID:request.userToken.id, postID:request.postID, replyDate:date, commentID:request.commentID}
    const {createdReply, error} = await addReply(replyRequest)
    if(createdReply) {
        response.status(200).json(createdReply)
    } else {
        response.status(400).send("Error al hallar el usuario.")
    }
})

repliesRouter.put('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    const { userReply } = request.body
    const reply = {
        id,
        userReply
    }
    const updated = await updateReply(reply)
    response.status(updated? 204 : 400).end()
})

repliesRouter.delete('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    try {
        deleteReply(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send(error)
    }
})

module.exports = { repliesRouter }