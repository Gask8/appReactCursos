import { useCursosForMiembros } from "./useCursosForMiembros";

export function DetailMiembro({ item, setSelectedId }) {
  const {
    id,
    correo,
    nombre,
    apellido_paterno,
    apellido_materno,
    rama,
    ponente,
    territorio,
    localidad,
    seccion,
  } = item;

  const { cursos } = useCursosForMiembros(id);

  return (
    <>
      <header>
        <div className="flexH">
          <img src={"legionario_img.png"} alt={`profile image`} />
          <h2>
            {nombre} {apellido_paterno} {apellido_materno}
          </h2>
          {ponente && <span>🎓</span>}
        </div>
        <div className="details-overview">
          <div className="flexH">
            <p>Correo: {correo} </p>
            <p> &thinsp; &bull; &thinsp;</p>
            <p>Rama: {rama}</p>
          </div>

          <p>
            <span>📍 Ubicación:</span>
            {territorio} {localidad} {seccion}
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <h4>📚 Cursos</h4>
          {cursos.length > 0 ? (
            <Cursos cursos={cursos} onSelect={setSelectedId} />
          ) : (
            <p className="alignCenter">
              <b>No tiene cursos</b>
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function Cursos({ cursos, onSelect }) {
  return (
    <ul className="selectedcursolist">
      {cursos.map((curso) => (
        <li
          key={curso.id}
          onClick={() => onSelect({ type: "curso", id: curso.cursos.id })}
        >
          <p>{curso.cursos.nombre}</p>
        </li>
      ))}
    </ul>
  );
}
