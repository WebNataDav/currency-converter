import SearchInput from "../SearchInput/index";
import { Currency } from '@/types';
import styles from './styles.module.scss';

interface SelectModalProps {
  setIsOpen: (isOpen: boolean) => void;
  handleSelect: (currency: Currency) => void;
  filteredOptions: Currency[];
  value: Currency;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SelectModal: React.FC<SelectModalProps> = ({
  filteredOptions,
  handleSelect,
  setIsOpen,
  value,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Select currency</h3>
          <p className={styles.modalSubtitle}>
            Choose a currency from the list below or use the search bar to find a specific currency..
              </p>
          <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search currencies..." />
        </div>

        <div className={styles.optionsList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.code}
                className={`${styles.option} ${value.code === option.code ? styles.selected : ''}`}
                onClick={() => handleSelect(option)}
              >
                <span className={styles.optionCode}>{option.code}</span>
                <span className={styles.optionName}>{option.name}</span>
              </div>
            ))
          ) : (
              <div className={styles.noResults}>
                No currencies found matching "{searchTerm}"
                </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default SelectModal;