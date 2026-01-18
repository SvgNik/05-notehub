import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import css from "./App.module.css";

const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const PER_PAGE = 6;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () =>
      fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
    placeholderData: keepPreviousData,
  });

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <h1 className={css.title}>NoteHub Test</h1>
        <SearchBox value={search} onChange={handleSearchChange} />

        <button className={css.createBtn} onClick={() => setIsModalOpen(true)}>
          Create Note +
        </button>
      </header>

      {isLoading && <p className={css.empty}>Loading notes...</p>}

      {isError && (
        <p className={css.error}>
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}

      {data?.notes?.length ? (
        <>
          <NoteList notes={data.notes} />
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              handlePageClick={handlePageClick}
              currentPage={page}
            />
          )}
        </>
      ) : (
        !isLoading && !isError && <p className={css.empty}>No notes found</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NoteForm onCancel={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default App;
