require('dotenv').config();
const { API } = process.env;
const { Driver, Teams } = require('../db')
const axios = require("axios").default;


module.exports = async ( name, teams, image, dob, nationlity, description ) => {

    const response = await axios(API)

    //busca si el Driver se encuentra en la api
    const found = response.data.some((e) => name == e.name)
    
    // si found tiene contenido no crea el Driver
    if(found){

        return{ status: 'this driver already exist'}
    }else{

        //busca los teams en la db
        const dbTeams = await Teams.findOne(
            {
            where: {name: teams}
        })

        if (!dbTeams){
            // si no encuentra el Team, muestra un error
            throw new Error(`${teams} it's not valid as a team`);
        }

        //crea un nuevo driver en la db
        const [newDriver] = await Driver.findOrCreate({
            where: { name: name },
            defaults: {
                name,
                teams,
                image,
                dob,
                nationlity,
                description,
            }
        });

        //Asocia el Team al nuevo Driver
        await newDriver.addTeams(dbTeams);

        // Formatear los datos antes de retornarlos
        const formattedDriver = {
            name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
            teams: teams,
            image: image,
            dob: dob,
            nationlity: nationlity,
            description: description,
        };

        return formattedDriver;
    }

}