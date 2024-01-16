require('dotenv').config();
const  { Driver, Teams } = require('../db')
const axios = require('axios')



module.exports = async (id) => {

    const dbID = /[a-zA-Z]/.test(id)
    console.log(id)

    if(!dbID){

        const response = await axios(`http://localhost:5000/drivers/${id}`)
       
        const data = response.data

        return {
            id: data.id,
            name: `${data.name.forename} ${data.name.surname}`,
            teams: data.teams,
            image: data.image.url,
            dob: data.dob,
            nationality: data.nationality,
            description: data.description
        }

    }else{

        const dbDrivers = await Driver.findOne({

            where:{
                id: id
            },
            include:[{
                model:Teams,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        })

        if(dbDrivers){

            return dbDrivers

        }else{

            throw new Error('Driver not found')
        }
    }

}