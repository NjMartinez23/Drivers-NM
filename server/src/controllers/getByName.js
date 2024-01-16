const { Driver, Teams } = require('../db');
const axios = require('axios').default;

module.exports = async (name) => {

    const dbDriver = await Driver.findOne({

        where: {
            name: name
        },
        include: [{ 
            model: Teams, 
            attributes: ['name'], 
            through: {
                attributes: []
            }
        }]
    })

    if(dbDriver){

        return dbDriver

    }else{

        const response = await axios(`http://localhost:5000/drivers?name.forename=${name}`)


        if(response) {

            const apiDriver = response.data.map( e =>{

                return {
                    id: e.id,
                    name: `${e.name.forename} ${e.name.surname}`,
                    teams: e.teams,
                    image: e.image.url,
                    dob: e.dob,
                    nationality: e.nationality,
                }    
            })

            return apiDriver
            
        }else{
            // Si la API no tiene resultados, lanza un error indicando que el nombre es inválido
            throw new Error('invalid name')
        }
    }
}