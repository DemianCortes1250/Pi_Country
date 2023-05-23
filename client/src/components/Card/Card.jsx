import React from "react";
import { Link } from "react-router-dom";
import style from '../Card/Card.module.css';

export default function Card (props) {
  return (
    <Link to={`/detail/${props.id}`}>
      <div>
        <h2 className={style.Card__Name}>{props.name}</h2>
        <img className={style.Card__Img} src={props.flag} alt={props.name} />
        <h5 className={style.Card__Continent}>Continente: {props.continent}</h5>
      </div>
    </Link>
  )
};