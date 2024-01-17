const axios = require("axios");
const { Teams } = require("../db");

// Función para obtener todos los equipos desde la API externa y almacenarlos en la base de datos local
const getAllTeamsDB = async () => {
  // Realizar una solicitud a la API externa y obtener datos de conductores
  const peticion = (await axios.get("http://localhost:5000/drivers")).data;
  let teamsApi = [];

  // Iterar sobre los conductores de la API y extraer información de equipos
  peticion.forEach((d) => {
    if (d.teams) {
      let teamsArray = d.teams.split(",").map((team) => team.trim());
      teamsApi.push(...teamsArray);
    }
  });

  // Eliminar duplicados y obtener una lista única de equipos
  let teamsUnicos = [...new Set(teamsApi)];

  // Iterar sobre los equipos únicos y crearlos en la base de datos local si no existen
  teamsUnicos.forEach(async (t) => {
    await Teams.findOrCreate({
      where: {
        teams: t,
      },
    });
  });

  console.log("Equipos Creados Exitosamente");
};

// Función para limpiar y obtener todos los equipos almacenados en la base de datos local
const cleanAllTeamsDB = async () => {
  const cleanTeams = [];
  const allTeams = await Teams.findAll();

  // Mapear y almacenar información de equipos limpios
  allTeams.map(async (t) => {
    cleanTeams.push(t.teams);
  });

  return cleanTeams;
};


module.exports = {
  getAllTeamsDB,
  cleanAllTeamsDB
};
