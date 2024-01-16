const postCreate = require ('../controllers/postCreate')


module.exports = async (req, res) => {

    const { 
        name,
        teams,
        image,
        dob,
        nationlity,
        description 
    } = req.body;

    try {

        let newDriver = await postCreate ( 
            name,
            teams,
            image,
            dob,
            nationlity,
            description
        );

        if (newDriver.status === 'this driver already exist') {
           
            return res.status(409).json(newDriver.status);

        }else{

            return res.status(201).json(newDriver);
        }
        
    } catch (error) {

        res.status(500).json(error.message);
    }
}