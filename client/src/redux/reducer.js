import {
GET_ALL_DRIVERS,
GET_NAME_DRIVERS,
GET_TEAMS,
FILTER_BY_TEAMS,
FILTER_CREATED,
ORDER_BY_NAME,
ORDER_BY_DOB,
POST_DRIVER,
DETAIL_DRIVER} from "./action-types"

const initialState= {
    allDrivers: [],
    allTeams: [],
    details: []
}

const reducer = (state = initialState, { type, payload}) => {
    switch (type){
        case GET_ALL_DRIVERS:
            return{
                ...state,
                allDrivers: payload,
            }
        
        case GET_NAME_DRIVERS:
            return{
                ...state,
                allDrivers: payload,
            }
        
        case GET_TEAMS:
            return{
                ...state,
                allTeams: payload,
            }
        
        case FILTER_BY_TEAMS:{
            const { allTeams: allTeamsFilter } = state;
            const statusFiltered = payload === 'all' ? allTeamsFilter : allTeamsFilter.filter(drivers => drivers.teams?.includes(payload.toLowerCase()));

            return {
                ...state,
                allDrivers: statusFiltered,
            };
        }

        case FILTER_CREATED:{
            const { allDrivers: allDriversCreatedFilter } = state;
            const createdFilter = payload === "dataBase" ? allDriversCreatedFilter.filter(e => e.createdInDb) : allDriversCreatedFilter.filter(e => !e.createdInDb);

            return {
                ...state,
                allDrivers: payload === "all" ? allDriversCreatedFilter : createdFilter,
            };
        }

        case ORDER_BY_NAME:{
            const sortedArr = [...state.allDrivers].sort((a, b) => {
                return payload === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            });

            return {
                ...state,
                allDrivers: sortedArr,
            };
        }

        case ORDER_BY_DOB:{
            const sortedDOB = [...state.allDrivers].sort((a, b) => {
                return payload === 'asc' ? a.dob - b.dob : b.dob - a.dob;
            });

             return {
                ...state,
                allDrivers: sortedDOB,
            };
        }

        case POST_DRIVER:
            return {
                ...state,
            }
        
        
        case DETAIL_DRIVER:
            return {
                ...state,
                details: payload
            }


        default: return {
            ...state
        }
    }
}

export default reducer;