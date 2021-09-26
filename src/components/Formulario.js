import React, {useState, useContext} from "react";
import {CategoriasContext} from "../context/CategoriasContext";
import {RecetasContext} from "../context/RecetasContext";

/* 
 Consuminos el context en la linea 7
pero antes se debe de importar en la linea 2
 */
export default function Formulario() {
  const [busqueda, setBusqueda] = useState({
    nombre: "",
    categoria: "",
  });

  // funcion para obtener datos de la busqueda
  //...busqueda: para q no lo reescriba cuando nos pasamos al otro campo

  const obtenerDatosBusqueda = (e) => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const {categorias} = useContext(CategoriasContext); // extraccion del context
  const {buscarRecetas, guardarConsultar} = useContext(RecetasContext); // extraccion del context

  return (
    <form
      className="container-fluid"
      onSubmit={(e) => {
        e.preventDefault();
        buscarRecetas(busqueda);
        guardarConsultar(true);
      }}
    >
      <fieldset className="text-center">
        <legend>BUSCA BEBIDAS POR INGREDIENTE O CATEGORIAS</legend>
      </fieldset>
      <div className="row mt-4 ">
        <div className="col-md-4">
          <input
            name="nombre"
            className="form-control"
            type="text"
            placeholder="Busca por Ingredientes"
            onChange={obtenerDatosBusqueda}
          />
        </div>
        <div className="col-md-4">
          <select
            name="categoria"
            className="form-control"
            onChange={obtenerDatosBusqueda}
          >
            <option value="">-- SELECCIONA CATEGORIA --</option>
            {categorias.map((categoria) => (
              <option key={categoria.strCategory} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 d-grid gap-2">
          <input
            type="submit"
            className="btn btn-dark"
            value="BUSCAR BEBIDAS"
          />
        </div>
      </div>
    </form>
  );
}
