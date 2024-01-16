require('dotenv').config();
const { API } = process.env
const { Teams } = require('../db')
const axios = require('axios').default



module.exports = async () => {
    // Verificar si ya hay Teams en la base de datos

    const dbTeams = await Teams.findAll();
    
    if(dbTeams.length){
        // Si existen Teams en la base de datos, los retorna
        
        let resDb = dbTeams.map((teams) => ({
            id: teams.id,
            name: teams.name,
        }));

        return resDb

    }else{
        // Si no hay Teams en la base de datos, los obtiene de la API
        
        const response = await axios(API);
        
        const teams = response.data

        //Se extrae la propiedad .teams de response.data
        const teamsArray = teams.map((driver) => driver.teams).join(',');

        //Separa las palabras en .teams por comas y hace una lista sin repetir
        const uniqueTeams = [...new Set(teamsArray.split(','))];
        //Set() solo permite valores únicos


        // Guarda en la db cada item en la lista
        uniqueTeams.forEach(async t => {
            
            await Teams.findOrCreate({
                
                where: {
                    name: t.trim()
                }
            })
        })
        
        //envia al front solo el nombre de los teams
        return uniqueTeams.map( (t) => ({
            name: t.trim()
        }))

    }
}