import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NoteList = ({ notes, onDelete }: NoteListProps) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <div className={css.content}>
            <p>{note.content}</p>
          </div>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              type="button"
              className={css.button}
              onClick={() => onDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
