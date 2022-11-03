import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getCountriesByName } from "../../redux/actions";

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
      <div>
        <input
          type="text"
          placeholder="Ingrese un Nombre"
          value={name}
          onChange={(el) => handleInputCountries(el)}
        />
        <button type="submit" onClick={(el) => handleSubmit(el)}>
          Buscar Pais
        </button>
      </div>
    </div>
  );
}
