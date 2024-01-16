const getById = require('../controllers/getById')

module.exports = async (req, res) => {

    const { id } = req.body

    try {
        
        const idDriver = await getById(id)

        res.status(200).json(idDriver)

    } catch (error) {
        
        res.status(404).json(error.message)
    }
}