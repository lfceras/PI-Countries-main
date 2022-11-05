import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getAllCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterCreated,
  filterByRegion,
} from "../../redux/actions";
import Pagination from "../paginado";
import React from "react";
import CountryCard from "../countryCard";
import styles from "./home.module.css";
import SearchBar from "../searchBar";

function Home() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const allCountries = useSelector((state) => state.allCountries);
  const countries = useSelector((state) => state.countries);
  // eslint-disable-next-line no-unused-vars
  const [orden, setOrden] = useState("");

  const currentPages = useSelector((state)=> state.currentPage)
  const pages= 10;
  const idLastCard = currentPages===1 ? 8 :currentPages * pages -2;
  const idFirstCard = currentPages===1 ? 0 :idLastCard - pages +1;
  const totalCard = allCountries.length 
  const currentCountries = allCountries.slice(idFirstCard, idLastCard+1)


  useEffect(() => {
    if (allCountries.length === countries.length) {
      // dejar el anzuelo
      dispatch(getAllCountries());
      dispatch(getActivities());
    }
  }, [allCountries.length, countries.length, dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllCountries());
  }
  function handleSelect(e) {
    e.preventDefault();
    e.target.value === "sin filtro"
      ? dispatch(getAllCountries())
      : dispatch(filterCreated(e.target.value));
    setOrden(`orden ${e.target.value}`);
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(`orden ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(orderByPopulation(e.target.value));
    setOrden(`orden${e.target.value}`);
  }
  function handleFilterByContinents(e) {
    e.preventDefault();
    dispatch(filterByRegion(e.target.value));
  }

  return (
    <div className={styles.principal}>
      <SearchBar />

      <div className={styles.contrlBtns}>
      <Link to="/activities">
        <button>Crear Actividades</button>
      </Link>
      <Link to={"/"}>
        <button>Inicio</button>
      </Link>
      <button onClick={(el) => handleClick(el)}>Recargar Paises</button>
      </div>      

      <div className={styles.inputs}>

        <div className={styles.alfabeticamente}>
          <label>Alfabético </label>
          <input
            type="submit"
            value="ALL"
            onClick={(el) => handleSortName(el)}
          />
          <input
            type="submit"
            value="A-Z"
            onClick={(el) => handleSortName(el)}
          />
          <input
            type="submit"
            value="Z-A"
            onClick={(el) => handleSortName(el)}
          />
        </div>


        <div className={styles.poblacion}>
          <label>Poblacion</label>
          <input
            type="submit"
            value="ALL"
            onClick={(el) => handleSortPopulation(el)}
          />
          <input
            type="submit"
            value="Menor"
            onClick={(el) => handleSortPopulation(el)}
          />
          <input
            type="submit"
            value="Mayor"
            onClick={(el) => handleSortPopulation(el)}
          />
        </div>

        <div className={styles.continentes}>
          <label>Continentes</label>
          <select onChange={(e) => handleFilterByContinents(e)}>
            <option value={"All"}>All </option>
            <option value={"Africa"}>África</option>
            <option value={"Antarctica"}>Antárctica</option>
            <option value={"Asia"}>Asia</option>
            <option value={"Europe"}>Europa</option>
            <option value={"Oceania"}>Oceanía</option>
            <option value={"North America"}>Norteamérica</option>
            <option value={"South America"}>Sudamérica</option>
          </select>
        </div>


        <div className={styles.actividad}>
          <label>Actividad</label>
          {activities.length === 0 ? (
            <p>No se han creado actividades</p>
          ) : (
            <select onChange={(e) => handleSelect(e)}>
              <option value="sin filtro">Sin filtro</option>
              {activities?.map((e) => (
                  <option value={e.name} key={e.id}>
                    {e.name}
                  </option>
              ))}
            </select>
          )}
        </div>
      </div>
      
      <div className={styles.countriesContainer}>
        {currentCountries?.map((e) => {
          return (
            <div key={e.id}>
              <CountryCard
                id={e.id}
                flag={e.flag}
                name={e.name}
                continents={e.continents}
              />
            </div>
          );
        })}
        </div>


        <Pagination
        totalCard={totalCard}
        currentPages={currentPages}
        pages={pages}
      />
      </div>
  );
}

export default Home;
