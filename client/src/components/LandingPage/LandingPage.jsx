import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage() {
    return (
        <div>
            <h1>Bienvedido a mi PI</h1>
            <Link to='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
    )
}