// import { useRef } from "react";

const secList = [
  "Señores",
  "Señoras",
  "Jóvenes Femenino",
  "Jóvenes Masculino",
  "ECYD Femenino",
  "ECYD Masculino",
];

const locList = [
  "Acapulco",
  "Campeche",
  "Cancún",
  "Chetumal",
  "Cozumel",
  "Costa Rica",
  "Cotija",
  "Córdoba",
  "Cuernavaca",
  "El Salvador",
  "Guatemala",
  "Lindavista",
  "Mérida",
  "México Norte",
  "México Poniente",
  "México Sur",
  "Morelia",
  "Oaxaca",
  "Orizaba",
  "Pachuca",
  "Playa del Carmen",
  "Puebla",
  "Querétaro",
  "Tapachula",
  "Toluca",
  "Tuxtla Gutiérrez",
  "Veracruz",
  "Villahermosa",
  "Xalapa",
];

export function Select({ value, setValue, resource }) {
  return (
    <>
      <label>{`Buscar ${resource}...`}</label>

      <select
        className="select"
        name={resource}
        id={resource}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value="">--Seleccionar--</option>

        {resource === "Localidad"
          ? locList.map((loc) => <Option key={loc} value={loc} />)
          : secList.map((sec) => <Option key={sec} value={sec} />)}
      </select>
    </>
  );
}

function Option({ value }) {
  return <option value={value}>{value}</option>;
}
