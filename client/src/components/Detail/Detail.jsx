import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail, restartDetail } from '../../redux/actions';
import Cards from '../Cards/Cards.jsx'



export default function Detail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(restartDetail())
        dispatch(getDetail(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const countriesDetail = useSelector((state) => state.detail)

    return (

        <div key={countriesDetail.id}>        
        <div>{
            countriesDetail.length ?
            <div>
                <div>
                <img src={countriesDetail[0].flag} alt={countriesDetail[0].name}/>  
                </div>
                <div>
                <h1>{countriesDetail[0].name}</h1>
                <div>
                    <h2>ID: {countriesDetail[0].id}</h2>
                    <h2>Continent: {countriesDetail[0].continent}</h2>
                    <h2>Capital: {countriesDetail[0].capital}</h2>
                    <h2>Subregion: {countriesDetail[0].subregion}</h2>
                    <h2>Area: {countriesDetail[0].area} km2</h2>
                    <h2>Population: {countriesDetail[0].population}</h2>
                </div>
                </div>       

                <div>  {countriesDetail[0].activities.map(el => {
                return (
                    <div>
                    <Link to='/activities'>
                        <h1>Activity</h1>
                    </Link>
                    <div>
                        <h3>{el.name}</h3>
                        <h3>Difficulty: {el.difficulty}</h3>
                        <h3>Duration: {el.duration}</h3>
                        <h3>Season: {el.season}</h3>
                        <h3>___________</h3>
                    </div>
                    </div>
                )
                })}
                </div>

            </div> : <div>
                <h1> Loading... </h1>
            </div>

        }</div>
        </div>
    );
}