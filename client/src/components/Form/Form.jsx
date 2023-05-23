import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import { postActivities, getActivities } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './Form.module.css';


function validate (input) {
    let errors = {};
    if (!input.name) {
    errors.name = 'You must fill this field above';
    } else if (!input.duration) {
    errors.duration = 'You must fill this field';
    } else if (!input.difficulty) {
    errors.difficulty = 'You must choose the difficulty';
    } else if (!input.season) {
    errors.difficulty = 'You must choose the season';
    } else if (!input.countryId === []) {
    errors.countryId = 'You must select a country'
    }
    return errors;
    }

export function ActivityCreate () {
    const dispatch = useDispatch()
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const countries = useSelector((state) => state.allCountries);

    const [input, setInput] = useState({
        name: '',
        duration: '',
        difficulty: '',
        season: '',
        countryId: '',
        });


    useEffect(() => {
        dispatch(getActivities());
    },[])

    function handleChange(ele) {
        setInput({
          ...input,
          [ele.target.name]: ele.target.value,
        });
        setErrors(
          validate({
            ...input,
            [ele.target.name]: ele.target.value,
          })
        );
      };

      function handleSubmit(ele) {
        ele.preventDefault();
        if (input.name === "" || input.duration === "" || input.difficulty === "" || input.season === "" || input.countryId.length === 0)
          return alert("Debes completar todos los campos");
      
        const activityData = {
          ...input,
          country: { id: input.countryId }, // Convertir el ID del país en un objeto con propiedad 'id'
        };
        dispatch(postActivities(input));
        alert('Activity Created');
        setInput({
            name: '',
            duration: '',
            difficulty: '',
            season: '',
            countryId: []
        })
        history.push('/home')
    };


    return (
        <div>
            <Link to="/home"><button>Volver</button></Link>
            <h1>Crear Actividad</h1>
            <form onSubmit={(ele) => handleSubmit(ele)}>
                <div>
                    <label>Nombre</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                        />
                    {errors.name && <p className={style.error}>{errors.name}</p>}
                </div>

                <div>
                    <label>Duracion</label>
                    <input
                        type="text"
                        value={input.duration}
                        name="duration"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Dificultad</label>
                    <input
                        type="Number"
                        value={input.difficulty}
                        name="difficulty"
                        min='1'
                        max='5' 
                        onChange={handleChange}
                        />
                    {errors.duration && <p className={style.error}>{errors.duration}</p>}
                </div>

                <div>
                    <label> Temporada </label>
                    <input
                        type="text"
                        name="season"
                        value={input.season}
                        onChange={(e) => handleChange(e)}
                    >
                    </input>
                </div>
                <div>
                    {errors.countryId && <p className={style.error}>{errors.countryId}</p>}
                    <label>Nombre del Pais</label>
                    <input
                        type="text"
                        value={input.countryId}
                        name="countryId"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit"> Crear Actividad </button>
                <div>

                </div>
            </form>
        </div>
    )
} 