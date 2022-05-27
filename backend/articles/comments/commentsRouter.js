const commentsRouter = require('express').Router()

const { setUserInfo, validateId } = require('../../shared/middlewares');

const {
    // getAllComments,
    getPostComments,
    addComment,
    updateComment,
    deleteComment
} = require('./commentsService');


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

commentsRouter.post('/', setUserInfo, async (request, response) => {
    const commentRequest = {userComment:request.body.userComment, userID:request.userInfo.id, postID:request.postID}
    console.log(commentRequest)
    const {createdComment, error} = await addComment(commentRequest)
    console.log(createdComment)
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

module.exports = { commentsRouter }