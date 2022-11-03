import axios from 'axios';

import { ORDER_BY_NAME, ORDER_BY_POPULATION, GET_ALL_COUNTRIES, GET_COUNTRIES_DETAILS, GET_ACTIVITIES, FILTER_CREATED, FILTER_BY_REGION, GET_COUNTRY_BYNAME,CLEAN, SET_PAGES } from "./componentes";

export function getAllCountries() {
  return async function (dispatch) {
    const count = await axios.get(`http://localhost:3001/countries`)
     dispatch({ type: GET_ALL_COUNTRIES, payload: count.data })
  }
}

export function  getCountriesByName(name){
  return async function(dispatch){
    const det = await axios.get(`http://localhost:3001/countries?name=${name}`)
   
    dispatch({type:GET_COUNTRY_BYNAME, payload:det.data})
    console.log(det.data)
  }
}

export function getActivities(){
  return async function(dispatch){
     const info = await axios.get(`http://localhost:3001/activities`)
    return  dispatch({type:GET_ACTIVITIES, payload:info.data})
  }
}


export function getCountriesDetails(id){
  return async function(dispatch){
    const json= await axios.get(`http://localhost:3001/countries/${id}`);
    return dispatch({type:GET_COUNTRIES_DETAILS, payload:json.data})
  }
}

export function filterByRegion(payload){
   return {
    type:FILTER_BY_REGION,
    payload
   }
}

export function filterCreated(payload){
  return {
    type:FILTER_CREATED,
    payload
  }
}

export function orderByName(payload){
    return {
      type:ORDER_BY_NAME,
      payload
    }
}

export function orderByPopulation(payload){
  return {
    type:ORDER_BY_POPULATION,
    payload
  }
}

export function addActivities(payload) {
  return async function (dispatch) {
      
      let info = await axios.post("http://localhost:3001/activities", payload);
      return dispatch({
      type: 'ADD_ACTIVITIES',
      payload: info.data
  })
}
}

export function Clean(){
  return function(dispatch){
    dispatch({
      type:CLEAN
      
    })
  }
}
  
export function setCurrentPage(page){
  return{
    type: SET_PAGES,
    payload: page
  }
}

