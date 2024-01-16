import{
GET_ALL_DRIVERS,
GET_NAME_DRIVERS,
GET_TEAMS,
FILTER_BY_TEAMS,
FILTER_CREATED,
ORDER_BY_NAME,
ORDER_BY_DOB,
POST_DRIVER,
DETAIL_DRIVER

    } from "./action-types"
import axios from "axios";

export const getAllDrivers= () => {

    return async (dispatch) =>{
        try{
            const apiData= await axios("http://localhost:5000/drivers")
            const allDrivers = apiData.data;
            dispatch({
                type: GET_ALL_DRIVERS,
                payload: allDrivers
        
            });
        } catch (error){
            console.error("Error al traer a los Drivers", error);
        }
 
    }
}

// Detalles de los Drivers por ID
export const getDetailDrivers = (id) => {
    
    return async (dispatch) => {
      try {
        const details = await axios.get(`http://localhost:5000/drivers?id=${id}`);
        
        const detailDrivers = details.data;
        
        dispatch({
          type: DETAIL_DRIVER,
          payload: detailDrivers,
        });
      } catch (error) {
        console.error("No se encontró el Driver:", error);
      }
    };
  };

// Busca los Drivers por nombre
  export function getNameDrivers(name) {
  return async (dispatch) => {
    try {
      const dataName = await axios(`http://localhost:5000/drivers/name`, {
        params: {
          name: name
        }
      });

      const allDataName = dataName.data;
      dispatch({
        type: GET_NAME_DRIVERS,
        payload: [allDataName]
      });
    } catch (error) {
      console.log(error);
    }
  };
}

// Traigo los Teams de los Drivers
export function getTeams() {
  return async (dispatch) => {
    try {
      const dataTeams = await axios('http://localhost:5000/teams');
      const allTeams = dataTeams.data;
      console.log(allTeams);
      dispatch({
        type: GET_TEAMS,
        payload: allTeams
      });
    } catch (error) {
      console.error('Error trayendo los Teams:', error);
    }
  };
}

// Para crear un Driver
export function postDriver(payload) {
  
    return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:5000/drivers', payload);
      const NewDriver = response.data;
      dispatch({
        type: POST_DRIVER,
        payload: NewDriver
      })
    } catch (error) {
      console.error('Error creando el Driver:', error);
    }
  };
}

export function filterByTeams(payload){ 
    return{
        type: FILTER_BY_TEAMS,
        payload
    }
}

//ordenamiento por origen
export function filterCreatedDriver(payload){
    return{
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByDOB(payload){
    return{
        type: ORDER_BY_DOB,
        payload
    }
 }



