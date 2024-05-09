export function Miembro({ miembro, onSelect }) {
  return (
    <li onClick={() => onSelect({ type: "miembro", id: miembro.id })}>
      {/* <img src={miembro.Poster} alt={`${miembro.Title} poster`} /> */}
      <h3>{miembro.nombre}</h3>
      <div>
        <p>
          <span>📧</span>
          <span>{miembro.correo}</span>
        </p>
      </div>
    </li>
  );
}
