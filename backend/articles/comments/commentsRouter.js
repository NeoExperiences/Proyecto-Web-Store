const commentsRouter = require('express').Router()

const { verifyUserToken, validateId } = require('../../shared/middlewares');

const {
    // getAllComments,
    getPostComments,
    addComment,
    updateComment,
    deleteComment
} = require('./commentsService');
const { repliesRouter } = require('./replies/repliesRouter');


// commentsRouter.get('/', async (request, response) => {
//     response.status(200).json(await getAllComments())
// })

commentsRouter.get('/', async (request, response) => {
    const {comments, error} = await getPostComments(request.postID)
    console.log(await getPostComments(request.postID))
    if(comments) {
        response.status(200).json(comments)
    } else {
        response.status(400).send("Error al hallar el usuario.")
    }
})

commentsRouter.post('/', verifyUserToken, async (request, response) => {
    const date = new Date()
    const commentRequest = {userComment:request.body.userComment, userID:request.userToken.id, postID:request.postID, commentDate:date}
    const {createdComment, error} = await addComment(commentRequest)
    if(createdComment) {
        response.status(200).json(createdComment)
    } else {
        response.status(400).send("Error al hallar el usuario.")
    }
})

commentsRouter.put('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    const { userComment } = request.body
    const comment = {
        id,
        userComment
    }
    const updated = await updateComment(comment)
    response.status(updated? 204 : 400).end()
})

commentsRouter.delete('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    try {
        deleteComment(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send(error)
    }
})

commentsRouter.use('/:id/replies', validateId, (request, response, next) => {
    request.commentID = +request.params.id;
    next()
}, repliesRouter)

module.exports = { commentsRouter }