const getByName = require('../controllers/getByName')


module.exports = async (req, res) => {

    const { name } = req.query

    try {
        
        if(name){

            const properName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

            console.log(properName)
            
            let nameDriver = await getByName(properName);

            res.status(200).json(nameDriver)

        }else{

            throw new Error('empty field')

        }

    } catch (error) {

        console.error(error);

        res.status(500).json(error.message)
    }
}