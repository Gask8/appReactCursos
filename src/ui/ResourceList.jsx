import { Miembro } from "../components/miembros/Miembro";
import { Curso } from "../components/cursos/Curso";

export function ResourceList({ resources, onSelect, type }) {
  return (
    <ul className="list list-movies">
      {resources?.map((e) =>
        type === "miembros" ? (
          <Miembro miembro={e} key={e.id} onSelect={onSelect} />
        ) : (
          <Curso curso={e} key={e.id} onSelect={onSelect} />
        )
      )}
    </ul>
  );
}
