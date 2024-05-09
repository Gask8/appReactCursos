import { useState, useEffect } from "react";
import { getCursosForMiembro } from "../../services/apiM_C";

export function useCursosForMiembros(id) {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCursos() {
      try {
        setIsLoading(true);
        setError("");
        const res = await getCursosForMiembro(id);
        setCursos(res);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCursos();

    return function () {
      controller.abort();
    };
  }, [id]);

  return { cursos, isLoading, error };
}
