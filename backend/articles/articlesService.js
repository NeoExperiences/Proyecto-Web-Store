const { db } = require('../db/connect')

const getAllArticles = async () => {
    return await db.query(`
        SELECT artic.id, artic.postName, artic.postContent, artic.picture, user.username as userName, artic.postDate, cat.name as categoryName, cat.id as categoryID
        FROM articulos artic
        JOIN usuarios user ON artic.userID = user.id
        JOIN categorias cat ON artic.postCategory = cat.id
    `, {
        type: db.QueryTypes.SELECT
    })
}

const getArticle = async id => {
    const [article] = await db.query(`
    SELECT artic.id, artic.postName, artic.postContent, artic.picture, user.username as userName, artic.userid, artic.postDate, cat.name as categoryName, cat.id as categoryID
    FROM articulos artic
    JOIN usuarios user ON artic.userID = user.id
    JOIN categorias cat ON artic.postCategory = cat.id
    WHERE artic.id = :id
    `, {
        type: db.QueryTypes.SELECT,
        replacements: { id }
    })
    return article
}

const updateArticle = async article => {
    const [, modified] = await db.query(`
    UPDATE articulos SET
        postName = :postName,
        postContent = :postContent
    WHERE id = :id
    `, {
        type: db.QueryTypes.UPDATE,
        replacements: article
    })
    return modified > 0
}

const addArticle = async article => {
    const [id] = await db.query(`
    INSERT INTO articulos (postName, postContent, userID, picture, postDate, postCategory) VALUES
        (:postName, :postContent, :userID, :picture, :postDate, :postCategory)
    `, {
        replacements: article
    })
    return { ...article, id }
}

const deleteArticle = async id => {
    await db.query(`
        DELETE FROM comentarios WHERE postID = :id;
    `, {
        replacements: { id }
    })
    await db.query(`
        DELETE FROM articulos WHERE id = :id;
    `, {
        replacements: { id }
    })
}

module.exports = {
    getAllArticles,
    getArticle,
    updateArticle,
    addArticle,
    deleteArticle
}