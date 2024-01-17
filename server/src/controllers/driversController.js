const axios = require("axios");
const { Drivers, Teams } = require("../db");
const backup = "https://lh3.googleusercontent.com/pw/AIL4fc_irPj-zC5X-8l5pyb_Nbp77KZEb6iHx9kFHAKi0HSkYXIMOfO-rV2DCgbCNBxWDkmvaidBg7xyYSNKTH0TjPcxZvt5Hy-egA8a71VLflpGXimStn100xDtD0seXi5-ysPGJZVw0YH8u5kHVtQ2B2ZLzg=w785-h651-s-no?authuser=0";

// Función para crear un nuevo conductor
const createDriver = async (
  forename,
  lastname,
  description,
  image_url,
  nationality,
  dob,
  teams
) => {
  // Manejo de la imagen, pongo un valor de respaldo si no existe
  if (!image_url) image_url = backup;
  else if (image_url.length < 4) image_url = backup;

  // Crear un nuevo conductor en la base de datos
  const newDriver = await Drivers.create({
    forename,
    lastname,
    description,
    image_url,
    nationality,
    dob,
  });

  // Encontrar o crear equipos asociados al conductor
  const foundTeams = await Promise.all(
    teams.map(async (t) => {
      const [createdTeam] = await Teams.findOrCreate({
        where: { teams: t },
      });
      return createdTeam;
    })
  );

  // Asociar los equipos al nuevo conductor
  await newDriver.addTeams(foundTeams);
  const teamsArray = foundTeams.map((t) => t.teams);

  // Devolver información del nuevo conductor
  return {
    id: newDriver.id,
    forename: newDriver.forename,
    lastname: newDriver.lastname,
    description: newDriver.description,
    image_url: newDriver.image_url,
    nationality: newDriver.nationality,
    dob: newDriver.dob,
    teams: teamsArray,
    api: false,
  };
};

// Función para traer conductores desde la API 
const getDriversapi = async () => {
  // Realizar una solicitud a la API y obtener datos
  const peticion = (await axios.get("http://localhost:5000/drivers")).data;
  let teamsArray = [];

  // Mapear datos de conductores de la API
  const allDrivers = peticion.map((a) => {
    const { id, name, description, image, nationality, dob } = a;
    if (a.teams) {
      teamsArray = a.teams.split(",").map((team) => team.trim());
    }

    // Maneja el valor imagen de respaldo si no existe 
    if (a.image.url.length < 4) {
      return {
        id,
        forename: name.forename,
        lastname: name.surname,
        nationality,
        dob,
        teams: teamsArray,
        image_url: backup,
        description,
        api: true,
      };
    }

    // Devolver información del conductor de la API
    return {
      id,
      forename: name.forename,
      lastname: name.surname,
      nationality,
      dob,
      teams: teamsArray,
      image_url: image.url,
      description,
      api: true,
    };
  });

  return allDrivers;
};

// Función para obtener conductores desde la base de datos local
const getDriversDB = async () => {
  // Obtener todos los conductores de la base de datos con información de equipos asociados
  const allDrivers = await Drivers.findAll({
    include: [
      {
        model: Teams,
        attributes: ["teams"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  // Mapea y limpia datos de conductores de la base de datos
  const cleanDrivers = await Promise.all(
    allDrivers.map(async (d) => {
      const teamsArray = d.Teams.map((team) => team.teams);
      return {
        id: d.id,
        forename: d.forename,
        lastname: d.lastname,
        description: d.description,
        image_url: d.image_url,
        nationality: d.nationality,
        dob: d.dob,
        teams: teamsArray,
        api: false,
      };
    })
  );

  return cleanDrivers;
};

// Función para obtener todos los conductores (de la API y de la base de datos)
const getAllDrivers = async (name) => {
  // Obtener conductores de la API y de la base de datos
  const driversApi = await getDriversapi();
  const driversDB = await getDriversDB();

  // Combinar conductores de la API y de la base de datos
  const allDrivers = [...driversApi, ...driversDB];

  // Manejar casos especiales si no se encuentran conductores o si se proporciona un nombre de búsqueda
  if (!allDrivers.length) throw new Error("No se encontraron Conductores");
  if (name) {
    // Filtrar conductores por nombre
    const filterDrivers = allDrivers.filter(
      (d) =>
        d.forename.toLowerCase().includes(name.toLowerCase()) ||
        d.lastname.toLowerCase().includes(name.toLowerCase())
    );
    return filterDrivers;
  }

  return allDrivers;
};


module.exports = {
  getDriversapi,
  getAllDrivers,
  getDriversDB,
  createDriver,
};
