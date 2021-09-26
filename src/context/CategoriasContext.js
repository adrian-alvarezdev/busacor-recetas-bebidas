import {createContext, useState, useEffect} from "react";
import axios from "axios";

// 1. importamos el paquete de useContext

// 2. Creamos el Context que es el "CategoriasContext"

export const CategoriasContext = createContext();

/* 3. Creamos el provider que es donde se encuentram
los datos del state y las funciones en este caso
es el const "CategoriasProvider" */

const CategoriasProvider = (props) => {
  // 4. Aqui se crea el state

  // ejecutamos la primera llamada ala api, mediante axios
  const [categorias, guardarCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
      const categorias = await axios.get(url);
      guardarCategorias(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    /*   en el return van todos los datos que seran disponibles
     para todos los componentes */

    <CategoriasContext.Provider value={{
        categorias
    }}>
      {props.children}
    </CategoriasContext.Provider>
  );
};

/*  5. Hat que exportar el "CategoriasProvider" e
 importarlo en el App
 */
export default CategoriasProvider;
