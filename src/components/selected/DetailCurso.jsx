import { useState } from "react";
import { Select } from "../../ui/Select";
import { useMiembrosForCursos } from "./useMiembrosForCursos";

export function DetailCurso({ item, setSelectedId }) {
  const { id, nombre, fecha_inicio, fecha_certificacion, ponente } = item;

  const { miembros, isLoading } = useMiembrosForCursos(id);
  const [selectSection, setSelectSection] = useState("");
  const [selectLocality, setSelectLocality] = useState("");

  console.log(miembros);

  const filteredMiembrosBySection =
    selectSection === ""
      ? miembros
      : miembros.filter(
          (element) => element.miembros.seccion === selectSection
        );

  const filteredMiembrosByLocality =
    selectLocality === ""
      ? filteredMiembrosBySection
      : filteredMiembrosBySection.filter(
          (element) => element.miembros.localidad === selectLocality
        );

  return (
    <div style={{ padding: "2rem 0" }}>
      <header>
        <div className="flexH">
          <h2 style={{ padding: "0 10% 20px" }}>{nombre}</h2>
        </div>
        <div className="details-overview">
          <div className="flexH">
            <p>Inicio: {fecha_inicio} </p>
            <p> &thinsp; &bull; &thinsp;</p>
            <p>Certificacion: {fecha_certificacion}</p>
          </div>

          <p>
            <span>🎓 Ponente:</span>
            {ponente}
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <h4>👥 Miembros</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Select
              resource="Localidad"
              value={selectLocality}
              setValue={setSelectLocality}
            />
            <Select
              resource="Seccion"
              value={selectSection}
              setValue={setSelectSection}
            />
          </div>

          {isLoading && <p>Cargando...</p>}
          {filteredMiembrosByLocality.length > 0 ? (
            <Miembros
              miembros={filteredMiembrosByLocality}
              onSelect={setSelectedId}
            />
          ) : (
            <p className="alignCenter">
              <b>No tiene miembros</b>
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function Miembros({ miembros, onSelect }) {
  return (
    <ul className="selectedcursolist">
      {miembros.map((curso) => (
        <li
          key={curso.id}
          onClick={() => onSelect({ type: "miembro", id: curso.miembros.id })}
        >
          <p>
            {curso.miembros.nombre} {curso.miembros.apellido_paterno}{" "}
            {curso.miembros.apellido_materno}
          </p>
        </li>
      ))}
    </ul>
  );
}
