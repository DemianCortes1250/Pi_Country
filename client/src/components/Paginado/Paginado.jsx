import React from "react";
import style from '../Paginado/Paginado.module.css'

export default function Paginado({ countriesPerPage, countries, paginado }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(countries/countriesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className={style.Paginated}>
        <ul className={style.Paginated__List}>
            {pageNumbers && pageNumbers.map(number => (
            <li key={number}>
                <button className={style.Paginated__Number} onClick={() => paginado(number)}> {number} </button>
            </li>
            ))}
        </ul>
        </nav>
    )
}