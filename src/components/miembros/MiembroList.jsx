import { Miembro } from "./Miembro";

export function MiembroList({ miembros, onSelectMiembro }) {
  return (
    <ul className="list list-movies">
      {miembros?.map((m) => (
        <Miembro miembro={m} key={m.id} onSelect={onSelectMiembro} />
      ))}
    </ul>
  );
}
