import { useState, useEffect } from "react";
import { getCursos } from "../../services/apiCursos";

export function useCursos(query) {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCursos() {
      try {
        setIsLoading(true);
        setError("");
        const res = await getCursos(query);
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
  }, [query]);

  return { cursos, isLoading, error };
}
