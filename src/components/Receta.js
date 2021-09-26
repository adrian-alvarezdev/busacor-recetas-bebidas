import React, {useState, useContext} from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {ModalContext} from "../context/ModalContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 64,
  p: 4,
};

export default function Receta({receta}) {
  const {setIdreceta, setDetallesreceta, detallesreceta} =
    useContext(ModalContext); // extraccion del context
  console.log(detallesreceta);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setIdreceta(null);
    setDetallesreceta({});
  };

  // Muestra y formatea los ingredientes
  const mostrarIngredientes = (detallesreceta) => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (detallesreceta[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {" "}
            {detallesreceta[`strIngredient${i}`]}{" "}
            {detallesreceta[`strMeasure${i}`]}
          </li>
        );
      }
    }

    return ingredientes;
  };

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <h2 className="card-header">{receta.strDrink}</h2>
        <img
          className="card-img-top"
          alt={`Imagen de: ${receta.strDrink}`}
          src={receta.strDrinkThumb}
        />
        <div className="mt-4 d-grid gap-2">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              setIdreceta(receta.idDrink);
              handleOpen();
            }}
          >
            VER MAS INFO
          </button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h2> {detallesreceta.strDrink} </h2>
              <h3 className="mt-4">INSTRUCCIONES</h3>
              <p> {detallesreceta.strInstructions} </p>
              <img
                className="img-fluid my-4"
                alt={`Imagen de la bebida: ${detallesreceta.strDrink}`}
                src={detallesreceta.strDrinkThumb}
              />
              <h3>Ingredientes y cantidades</h3>
              <ul>{mostrarIngredientes(detallesreceta)}</ul>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}
