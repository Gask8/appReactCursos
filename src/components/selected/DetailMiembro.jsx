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

  const { cursos, isLoading } = useCursosForMiembros(id);

  function selectImg(rama, nombre) {
    switch (rama) {
      case "Laicos Consagrados":
        return "consagrado_img.png";
      case "Consagradas":
        return "consagrada_img.png";
      case "Legionarios de Cristo":
        return "legionario_img.png";
      default:
        if (nombre?.trim().slice(-1) === "a") return "laica_img.png";
        return "laico_img.png";
    }
  }

  return (
    <>
      <header>
        <div className="flexH">
          <img src={selectImg(rama, nombre)} alt={`profile image`} />
          <h2>
            {nombre} {apellido_paterno} {apellido_materno}
            &nbsp;
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
            <span>📍 Ubicación: </span>
            {territorio} {localidad} {seccion}
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <h4>📚 Cursos</h4>
          {isLoading && <p>Cargando...</p>}
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
