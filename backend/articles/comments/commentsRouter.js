const commentsRouter = require('express').Router()

const { setUserInfo } = require('../../shared/middlewares');

const {
    // getAllComments,
    getPostComments,
    addComment
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

module.exports = { commentsRouter }