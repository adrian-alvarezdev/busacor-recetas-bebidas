import React, {useState, useContext} from "react";
import {RecetasContext} from "../context/RecetasContext";
import Receta from "./Receta";

export default function Recetas() {
  const {recetas} = useContext(RecetasContext); // extraccion del context
  console.log(recetas);
  return (
    <div className="row mt-5">
      {recetas.map((receta) => (
        <Receta key={receta.idDrink} receta={receta} />
      ))}
    </div>
  );
}
