import { useKey } from "../../hooks/useKey";
import { Loader } from "../../ui/Loader";
import { DetailMiembro } from "./DetailMiembro";
import { DetailCurso } from "./DetailCurso";
import { useDetailItem } from "./useDetailItem";

export function SelectedDetails({ selectedId, setSelectedId, onClose }) {
  useKey("Escape", onClose);

  const { item, isLoading } = useDetailItem(selectedId);

  // useEffect(
  //   function () {
  //     if (!title) return;
  //     document.title = `Movie | ${title}`;

  //     return function () {
  //       document.title = "usePopcorn";
  //       // console.log(`Clean up effect for movie ${title}`);
  //     };
  //   },
  //   [title]
  // );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <button className="btn-back" onClick={onClose}>
            ⬅️
          </button>
          {selectedId.type === "miembro" ? (
            <DetailMiembro item={item} setSelectedId={setSelectedId} />
          ) : (
            <DetailCurso item={item} setSelectedId={setSelectedId} />
          )}
        </>
      )}
    </div>
  );
}
