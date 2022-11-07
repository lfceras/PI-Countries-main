import React from 'react';
import { Link } from 'react-router-dom'
import './countryCard.css'


function CountryCard({flag,name,continents,id,population}) {
    return ( 
      <div className="pContainer">
            <Link to={`/country/${id}`} 
            style={{"textDecoration": "none"}}>
            <img src={flag} alt={flag} />
            <label>Nombre del Pais</label>
            <h3>{name}</h3>
            </Link>
            <label>Nombre del Continente</label>
            <h3>{continents}</h3>
            <label>Poblacion</label>
            <h3>{population?.toLocaleString("es-AR") || ""} Hab</h3>
        </div>
     );
}

export default CountryCard;