import { ORDER_BY_POPULATION, GET_COUNTRYS, HIGHER_POPULATION, ORDER_BY_NAME, ASC, FILTER_BY_CONTINENT, SEARCH_COUNTRIES,
    FILTER_BY_ACTIVITIES, GET_ACTIVITIES, POST_ACTIVITIES, RESET, DETAIL} from "../../types/const";

const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COUNTRYS:
        return {
            ...state,
            countries: action.payload,
            allCountries: action.payload
        }

        case SEARCH_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }

        case ORDER_BY_POPULATION:
        let orderCountriesByPopulation = action.payload === HIGHER_POPULATION ? state.countries.sort((a, b) => {
            if (a.population < b.population) {
            return 1;
            }
            if (a.population > b.population) {
            return -1
            }
            return 0;
        }) : 
            state.countries.sort((a, b) => {
            if (a.population < b.population) {
                return -1;
            }
            if (a.population > b.population) {
                return 1;
            }
            return 0;
            })
        
        return {
            ...state,
            countries: orderCountriesByPopulation
        }

        case ORDER_BY_NAME:
            let orderCountriesByName = action.payload === ASC ? state.countries.sort((a, b) => {
                if (a.name > b.name) {
                return 1;    
                }
                if (a.name < b.name) {
                return -1;
                }
                return 0;
            }) :
                state.countries.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
                })
    
            return {
                ...state,
                countries: orderCountriesByName
            }

        case FILTER_BY_CONTINENT:
            const filterByContinent = state.allCountries
            const filteredCont = action.payload === 'All' ? filterByContinent : filterByContinent.filter(e => e.continent === action.payload)
            return {
                ...state,
                countries: filteredCont
            }

            case FILTER_BY_ACTIVITIES:
                const filterByActivities = state.allCountries
                const filteredAct = filterByActivities.filter((c) => { return c.activities.some((activity) => {return activity.name === action.payload;}); });
                console.log(action.payload)
                if (action.payload === 'All') {
                    return {
                    ...state, 
                    countries: filterByActivities
                    }
                } else {
                    return {
                    ...state,
                    countries: filteredAct
                    }
                }

        

        case POST_ACTIVITIES:
            return {
                ...state
            }
    
                    
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload
            }
            
        case DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        
        case RESET:
            return {
                ...state,
                detail: []
            }   

        default:
            return state;
    }
}
