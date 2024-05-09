import { useState, useEffect } from "react";
import { getMiembrosForCurso } from "../../services/apiM_C";

export function useMiembrosForCursos(id) {
  const [miembros, setMiembros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMiembros() {
      try {
        setIsLoading(true);
        setError("");
        const res = await getMiembrosForCurso(id);
        setMiembros(res);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMiembros();

    return function () {
      controller.abort();
    };
  }, [id]);

  return { miembros, isLoading, error };
}
