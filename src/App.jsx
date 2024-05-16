/* eslint-disable react/prop-types */
import { useState } from "react";

import { useMiembros } from "./components/miembros/useMiembros";
import { useCursos } from "./components/cursos/useCursos";
// import { useLocalStorageState } from "./hooks/useLocalStorageState";

import { ResourceList } from "./ui/ResourceList";
import { Loader } from "./ui/Loader";
import { ErrorMessage } from "./ui/ErrorMessage";
import { NavBar } from "./ui/NavBar";
import { Search } from "./ui/Search";
import { NumResults } from "./ui/NumResults";
import { Box } from "./ui/Box";
import { SelectedDetails } from "./components/selected/SelectedDetails";

export const KEY = "f84fc31d";

export default function App() {
  const [queryM, setQueryM] = useState("");
  const [queryC, setQueryC] = useState("");

  const [selectedId, setSelectedId] = useState({ type: null, id: null });
  const [memoryStack, setMemoryStack] = useState([]);

  console.log("id", selectedId);

  const { miembros, isLoading: isLoaMi, error: err1 } = useMiembros(queryM);
  const { cursos, isLoading: isLoaCu, error: err2 } = useCursos(queryC);

  const error = err1 || err2;

  function handleSelectItem(idObj) {
    setSelectedId((selectedId) =>
      idObj.id === selectedId.id && idObj.type === selectedId.type
        ? { type: null, id: null }
        : idObj
    );
    setMemoryStack((memoryStack) => [...memoryStack, idObj]);
  }

  function handleCloseItem() {
    setSelectedId({ type: null, id: null });
  }

  function handleGoBack() {
    if (memoryStack.length > 1) {
      memoryStack.pop();
      setSelectedId(memoryStack[memoryStack.length - 1]);
    } else {
      handleCloseItem();
    }
  }

  return (
    <>
      <NavBar>
        <Search query={queryM} setQuery={setQueryM} resource="Miembros" />
        <Search query={queryC} setQuery={setQueryC} resource="Cursos" />
        <NumResults resorces={miembros} />
      </NavBar>

      <Main>
        <Box type="1">
          {isLoaMi && <Loader />}
          {!isLoaMi && !error && (
            <ResourceList
              resources={miembros}
              onSelect={handleSelectItem}
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
              onSelect={handleSelectItem}
              type="cursos"
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box type="2">
          {selectedId.id ? (
            <SelectedDetails
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onClose={handleGoBack}
            />
          ) : null}
          {/* 
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )} */}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
