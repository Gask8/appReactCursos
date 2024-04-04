export function Curso({ curso, onSelect }) {
  return (
    <li onClick={() => onSelect(curso.id)}>
      {/* <img src={curso.Poster} alt={`${curso.Title} poster`} /> */}
      <h3>{curso.nombre}</h3>
      <div>
        <p>
          <span>📧</span>
          {/* <span>{curso.correo}</span> */}
        </p>
      </div>
    </li>
  );
}
