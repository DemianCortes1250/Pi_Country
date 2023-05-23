import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { searchCountries } from "../../redux/actions";
import style from "../SeachBar/SeachBar.module.css"

export default function SeachBar() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

 
    function handleSubmit(ele) {
        ele.preventDefault();
        if (search.length === 0) return alert('You should introduce a country');
        dispatch(searchCountries(search))
        setSearch('')
    }

    function handleImputChange(ele) {
        ele.preventDefault();
        setSearch(ele.target.value)
    }

    return (
        <div className={style.SeachBar}>
            <input
            type="text"
            placeholder="Buscar..."
            onChange={(e) => handleImputChange(e)}
            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}