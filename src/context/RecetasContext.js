import {createContext, useState, useEffect} from "react";
import axios from "axios";

// creamos el context

export const RecetasContext = createContext();

const RecetasProvider = (props) => {
  const [recetas, guardarRecetas] = useState([]);
  const [consultar, guardarConsultar] = useState(false);
  const [busqueda, buscarRecetas] = useState({
    nombre: "",
    categoria: "",
  });

  const {nombre, categoria} = busqueda;

  // ejecutar useeffect

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const resultado = await axios.get(url);
        guardarRecetas(resultado.data.drinks);
      };

      obtenerRecetas();
    }
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{
        buscarRecetas,
        guardarConsultar,
        recetas,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
