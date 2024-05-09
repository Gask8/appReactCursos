import { useState, useEffect } from "react";
import { getMiembro } from "../../services/apiMiembros";
import { getCurso } from "../../services/apiCursos";

export function useDetailItem(selectedId) {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchItem() {
      try {
        setIsLoading(true);
        setError("");
        let res = [];
        if (selectedId.type === "miembro") {
          res = await getMiembro(selectedId.id);
        } else {
          res = await getCurso(selectedId.id);
        }
        setItem(res);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchItem();

    return function () {
      controller.abort();
    };
  }, [selectedId]);

  return { item, isLoading, error };
}
