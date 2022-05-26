const articlesRouter = require('express').Router()
const {
    getAllArticles,
    getArticle,
    updateArticle,
    addArticle,
    deleteArticle
} = require('./articlesService');
const { commentsRouter } = require('./comments/commentsRouter')

const { validateId } = require('../shared/middlewares')
const { checkRole } = require('../shared/middlewares')

const verifyArticle = async (request, response, next) => {
    if(!await getArticle(+request.params.id)) return response.status(404).end()
    else next()
}

articlesRouter.get('/', async (request, response) => {
    response.status(200).json(await getAllArticles())
})

articlesRouter.get('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    const article = await getArticle(id)
    if(!article) return response.status(404).end()
    else response.status(200).json(article)
})

articlesRouter.put('/:id', validateId, verifyArticle, async (request, response) => {
    const id = +request.params.id
    const { postName, postContent } = request.body
    const article = {
        id,
        postName,
        postContent
    }
    console.log("HERE",article)
    const updated = await updateArticle(article)
    response.status(updated? 204 : 400).end()
})


articlesRouter.delete('/:id', validateId, verifyArticle, checkRole('admin'), async (request, response) => {
    const id = +request.params.id
    try {
        deleteArticle(id)
        response.status(204).end()
    } catch (error) {
        response.status(400).send(error)
    }
})

articlesRouter.post('/', async (request, response) => {
    response.status(200).json(await addArticle(request.body))
})


articlesRouter.use('/:id/comments', validateId, (request, response, next) => {
    request.postID = +request.params.id;
    next()
}, commentsRouter)
module.exports = { articlesRouter }