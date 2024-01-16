require('dotenv').config();
const { API } = process.env
const { Driver, Teams } = require('../db')
const axios = require('axios')

module.exports = async () => {

    //reques a la API
    let response = await axios( API );

    //reques a la DB para obtener los drivers
    const dbDrivers = await Driver.findAll({
        include: [{
            model: Teams,
            attributes: ['name'],
            through:{
                attributes: []
            }
        }]
    })

    const drivers = response.data
    const apiDrivers = await Promise.all( drivers.map( async e => {
        return {
            id: e.id,
            name: `${e.name.forename} ${e.name.surname}`,
            teams: e.teams,
            image: e.image.url,
            dob: e.dob,
            nationality: e.nationality,
            description: e.description
        }
    }))

    const allDrivers = [...apiDrivers,...dbDrivers ]
    return allDrivers
}