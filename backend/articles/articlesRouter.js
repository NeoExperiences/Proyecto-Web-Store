const articlesRouter = require('express').Router()
const {
    getAllArticles,
    getArticle,
    updateArticle,
    addArticle,
    deleteArticle,
    getPagedArticles,
    existingArticles
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

articlesRouter.get('/page/', async (request, response) => {
    const allArticles = existingArticles()
    response.status(200).json(await allArticles)
})

articlesRouter.get('/page/:id', async (request, response) => {
    const offset = (10 * +request.params.id)
    response.status(200).json(await getPagedArticles(offset))
})

articlesRouter.get('/:id', validateId, async (request, response) => {
    const id = +request.params.id
    const article = await getArticle(id)
    if(!article) return response.status(404).end()
    else response.status(200).json(article)
})

articlesRouter.put('/:id', validateId, verifyArticle, async (request, response) => {
    const id = +request.params.id
    const { postName, postContent, picture } = request.body
    if (!picture){
        const article = {
            id,
            postName,
            picture: "https://via.placeholder.com/150/92c952",
            postContent
        }
        const updated = await updateArticle(article)
        response.status(updated? 204 : 400).end()
    }
    else {
        const article = {
            id,
            postName,
            picture,
            postContent
        }
        const updated = await updateArticle(article)
        response.status(updated? 204 : 400).end()
    }
    
    
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

articlesRouter.post('/', checkRole('admin'), async (request, response) => {
    const { postName, postContent, userID, picture, categoryID } = request.body
    if (!picture) {
        const article = {
            postName,
            postContent,
            userID,
            postDate:new Date(),
            postCategory:categoryID,
            picture: "https://via.placeholder.com/150/92c952"
        }
        response.status(200).json(await addArticle(article))
    } else {
        const article = {
            postName,
            postContent,
            userID,
            postDate:new Date(),
            postCategory:categoryID,
            picture
        }
        response.status(200).json(await addArticle(article))
    }
    
})


articlesRouter.use('/:id/comments', validateId, (request, response, next) => {
    request.postID = +request.params.id;
    next()
}, commentsRouter)

module.exports = { articlesRouter }