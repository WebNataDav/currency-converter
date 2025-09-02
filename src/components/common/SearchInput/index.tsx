import { FiSearch } from 'react-icons/fi';
import styles from './styles.module.scss';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
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
      />
    </div>
  );
};

export default SearchInput;