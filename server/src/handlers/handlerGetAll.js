const getAll = require('../controllers/getAll')

module.exports = async (req, res) => {
    try {
        
        const drivers = await getAll()

        res.status(200).json(drivers)

    } catch (error) {
        res.status(400).json(error.message)
    }
}