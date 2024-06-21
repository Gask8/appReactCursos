// import { useRef } from "react";

const secList = [
  "Señores",
  "Señoras",
  "Jóvenes Femenino",
  "Jóvenes Masculino",
  "ECYD Femenino",
  "ECYD Masculino",
];

export function Select({ value, setValue, resource }) {
  // const inputEl = useRef(null);

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {/* <input
        className="search"
        type="text"
        placeholder={`Buscar ${resource}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEl}
      /> */}

      <label>{`Buscar ${resource}...`}</label>

      <select name="seccion" id="seccion" value={value} onChange={setValue}>
        <option value="">--Seleccionar--</option>
        {secList.map((sec) => (
          <Option key={sec} value={sec} />
        ))}
      </select>
    </div>
  );
}

function Option({ value }) {
  return <option value={value}>{value}</option>;
}
