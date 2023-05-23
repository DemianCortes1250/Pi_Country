import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, orderCountriesByPopulation, orderByName, filterByContinent, filterByActivity, getActivities } from "../../redux/actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SeachBar from '../SeachBar/SeachBar.jsx'
import style from './Cards.module.css';


export default function Cards() {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    const activities = useSelector((state) => state.activities);
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const lastCountry = currentPage * countriesPerPage
    const firtsCountry = lastCountry - countriesPerPage
    const currentCrountries = Array.isArray(countries) ? countries.slice(firtsCountry, lastCountry) : [];
    const [, setOrden] = useState('');
    const [selectedActivity, setSelectedActivity] = useState("All");

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch]);
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handleSort(ele) {
        ele.preventDefault();
        dispatch(orderCountriesByPopulation(ele.target.value));
        setCurrentPage(1);
        setOrden(`Ordenador ${ele.target.value}`);
    }

    function handleSort2(ele) {
        ele.preventDefault();
        dispatch(orderByName(ele.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${ele.target.value}`)
      }
      
      function handleFilterContinent(ele) {
      dispatch(filterByContinent(ele.target.value));
      setCurrentPage(1);
    }

    function handleFilterActivity(ele) {
      const selectedValue = ele.target.value;
      const selectedActivity = activities.find(
        (activity) => activity.name === selectedValue
      );
      if (selectedActivity) {
        dispatch(filterByActivity(selectedValue, selectedActivity.country));
        setCurrentPage(1);
        setSelectedActivity(selectedValue);
      }
    }
    
    return (
      <div className={style.home}>
          <h1>Countries Pi</h1>
          <div className={style.selectContainer}>
            <select className={style.selectContainer}  onChange={(ele) => {handleSort2(ele)}}>
              <option>Filter by Alphabetic Order</option>
              <option value="ASC">A--Z</option>
              <option value="DESC">Z--A</option>
            </select>

            <select className={style.selectContainer} onChange={(ele) => {handleSort(ele)}}>
              <option>Filter by Population</option>
              <option value="HIGHER_POPULATION">HIGHER POPULATION</option>
              <option value="LESS_POPULATION">LOWER POPULATION</option>
            </select>

            <select className={style.selectContainer} onChange={(ele) => handleFilterActivity(ele)}>
            {activities?.map((activity, index) => (
              <option key={index} value={activity.name}>
              {activity.name}
              </option>
            ))}
            </select>
          

            <select className={style.selectContainer} onChange={(ele) => handleFilterContinent(ele)}>
              <option> Filter by Continent</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

          <Link to="/activity">Create activity</Link>
          
          </div>

          <SeachBar className={style.SeachBar}/>
          <button className={style.reloadbutton} onClick={(e) => handleClick(e)}>Reload Page</button>
     
          <Paginado 
            countriesPerPage={countriesPerPage}
            countries={countries.length}
            paginado={paginado}
          />
          
          <div> 
            {currentCrountries?.map((country) => {
                return (
                <div className={style.Card_Box} key={country.id}>
                    <Card
                      id={country.id}
                      name={country.name}
                      flag={country.flag}
                      continent={country.continent}
                      capital={country.capital}
                      population={country.population}
                    />
                </div>

              );
            })}
          </div> 


        </div>

      );
    }