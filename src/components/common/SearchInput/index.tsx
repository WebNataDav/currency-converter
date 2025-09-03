import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onKeyDown
}) => {
  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <FiSearch className={styles.searchIcon} size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.searchInput}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchInput;