import { useState, useEffect } from "react";
import { getMiembros } from "../services/apiMiembros";

export function useMiembros(query) {
  const [miembros, setMiembros] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMiembros() {
      try {
        setIsLoading(true);
        setError("");
        const res = await getMiembros(query);
        setMiembros(res);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    // if (query.length < 3) {
    //   setMiembros([]);
    //   setError("");
    //   return;
    // }

    fetchMiembros();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { miembros, isLoading, error };
}
