import axios from 'axios';
import { GET_COUNTRYS, ORDER_BY_POPULATION, ORDER_BY_NAME, FILTER_BY_CONTINENT, SEARCH_COUNTRIES, FILTER_BY_ACTIVITIES, GET_ACTIVITIES, POST_ACTIVITIES, DETAIL, RESET} from '../../types/const';

export function getCountries() {
    return async function (dispatch) {
        try {
        var json = await axios.get("http://localhost:3001/countries");
        return dispatch({
            type: GET_COUNTRYS,
            payload: json.data,
        });
        } catch (error) {
        console.log(error);
        }
    };
    }

export function orderCountriesByPopulation (payload) {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function filterByContinent(payload) {
    return {
        type: FILTER_BY_CONTINENT,
        payload,
    };
}

export function searchCountries(search) {
    return async function (dispatch) {
        try {
            var json = await axios("http://localhost:3001/countries?name=" + search);
            return dispatch({
                type: SEARCH_COUNTRIES,
                payload: json.data,
            });
            } catch (error) {
            alert("Country not found");
            }
        };
}

export const filterByActivity = (activityName, country) => {
    return {
      type: FILTER_BY_ACTIVITIES,
      payload: { activityName, country },
    };
  };

  export const getActivities = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get("http://localhost:3001/activity");
            const activities = response.data
            dispatch({ type: GET_ACTIVITIES, payload: activities });
        } catch (error) {
          console.log(error);
        }
    }
  }
/*export const getActivities = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get("http://localhost:3001/activity");
        const activities = response.data.map((activity) => ({
          ...activity,
          country: activity.country.name
        }));
        dispatch({ type: GET_ACTIVITIES, payload: activities });
      } catch (error) {
        console.log(error);
      }
    };
  };*/

export function postActivities(payload) {
    return async function (dispatch) {
        await axios.post ("http://localhost:3001/activity", payload);
        return dispatch ({
            type: POST_ACTIVITIES,
        })
    }
}

export function getDetail(id) {
    return async function (dispatch) {
        try {
        let json = await axios.get("http://localhost:3001/countries/" + id);
        return dispatch({
            type: DETAIL,
            payload: json.data,
        });
        } catch (error) {
        console.log(error);
        }
    };
    }

export function restartDetail() {
    return (dispatch) => {
        dispatch({
        type: RESET,
        });
    };
    }