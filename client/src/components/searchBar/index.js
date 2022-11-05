import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCountriesByName } from "../../redux/actions";
import styles from './searchbar.module.css'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputCountries(el) {
    el.preventDefault();
    setName(el.target.value);
  }

  function handleSubmit(el) {
    el.preventDefault();
    if (!name) return alert("Debes ingresar un pais");
    else {
      dispatch(getCountriesByName(name));
      setName("");
    }
  }

  return (
    <div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Ingrese un Nombre"
          value={name}
          onChange={(el) => handleInputCountries(el)}
          className={styles.input}
        />
        <button
         type="submit" 
         onClick={(el) => handleSubmit(el)}
         className={styles.btn}>
          Buscar Pais
        </button>
      </div>
    </div>
  );
}