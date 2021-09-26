import {createContext, useState, useEffect} from "react";
import axios from "axios";

// creamos el context
export const ModalContext = createContext()

// creamos el provider
const ModalProvider = (props) => {
  // state del provider guardamos el id de la receta
  const [idreceta, setIdreceta] = useState(null);
  const [detallesreceta, setDetallesreceta] = useState({});

  // una vez que tenemos el id de receta llamamos ala api

  useEffect(() => {
    const obtenerReceta = async () => {
      if (!idreceta) return;
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
      const resultado = await axios.get(url);
      // console.log(resultado.data.drinks[0]);
      setDetallesreceta(resultado.data.drinks[0]);
    };
    obtenerReceta();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{
        setIdreceta,
        detallesreceta,
        setDetallesreceta
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
