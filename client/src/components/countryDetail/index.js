import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getCountriesDetails, Clean } from "../../redux/actions";
import styles from './countrydetail.module.css'
import Loading from "../loading/Loading";


const CountryDetail = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.details);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getCountriesDetails(id));
    return dispatch(Clean());
  }, [dispatch, id]);

  // console.log(details);

  return details && details.id ? (
    <div className={styles.country}>

        <Link to={"/home"}>
            <input type="button" value="Volver" id={styles.inpt}/>
        </Link>
      <div  className={styles.principal}>
        <div style={{"flexGrow": "1"}}
        className={styles.detalles} >
        
        <img src={details.flag} alt={details.flag} />
          <h1>{details.name}</h1>
            <label>Capital: </label>
          <h2>{details.capital}</h2>
            <label>Continents: </label>
          <h2>{details.continents}</h2>
          <label>Subregion: </label>
          <h2>{details.subregion}</h2>
          <label>Area: </label>
          <h2>{details.area?.toLocaleString("es-AR") || ""} km<sup>2</sup>
          </h2>
          <label>Poblation: </label>
          <h2>
            {details.population?.toLocaleString("es-AR") || ""}
          </h2>
        </div>

        <div style={{"flexGrow": "1"}}
      className={styles.actividades}  >

        <h2>Actividades </h2>
      {
        details.Activities && details.Activities.map(el => {
          return(
            <div key={el.id} className={styles.solos}>
              <label>Nombre de actividad: </label>
              <h3>{el.name}</h3>
              <label>Dificultad de actividad: </label>
              <h3>{el.dificulty}</h3>
              <label>Duracion de actividad: </label>
              <h3>{el.duration}</h3>
              <label>Temporada de actividad: </label>
              <h3>{el.season}</h3>
            </div>
          )
        }) 
      }
        
      </div>
      </div>
    </div>
  ) : (
    <div>
      <Loading/>
    </div>
  )
};

export default CountryDetail;
