import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <div className={css.wrapper}>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
