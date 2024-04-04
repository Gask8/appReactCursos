/* eslint-disable react/prop-types */
import { useState } from "react";

import { useMiembros } from "./hooks/useMiembros";
import { useCursos } from "./hooks/useCursos";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

import { MovieDetails } from "./components/movies/MovieDetails";
import { WatchedSummary } from "./components/movies/WatchedSummary";
import { WatchedMoviesList } from "./components/movies/WatchedMoviesList";

import { ResourceList } from "./ui/ResourceList";
import { Loader } from "./ui/Loader";
import { ErrorMessage } from "./ui/ErrorMessage";
import { NavBar } from "./ui/NavBar";
import { Search } from "./ui/Search";
import { NumResults } from "./ui/NumResults";
import { Box } from "./ui/Box";

export const KEY = "f84fc31d";

export default function App() {
  const [queryM, setQueryM] = useState("");
  const [queryC, setQueryC] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const { miembros, isLoading: isLoaMi, error: err1 } = useMiembros(queryM);
  const { cursos, isLoading: isLoaCu, error: err2 } = useCursos(queryC);

  const error = err1 || err2;

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={queryM} setQuery={setQueryM} resource="Miembros" />
        <Search query={queryC} setQuery={setQueryC} resource="Cursos" />
        <NumResults movies={miembros} />
      </NavBar>

      <Main>
        <Box type="1">
          {isLoaMi && <Loader />}
          {!isLoaMi && !error && (
            <ResourceList
              resources={miembros}
              onSelect={handleSelectMovie}
              type="miembros"
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box type="1">
          {isLoaCu && <Loader />}
          {!isLoaCu && !error && (
            <ResourceList
              resources={cursos}
              onSelect={handleSelectMovie}
              type="cursos"
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box type="2">
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
