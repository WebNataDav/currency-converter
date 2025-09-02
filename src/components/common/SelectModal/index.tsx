import { useState, useEffect, useRef } from 'react';
import SearchInput from "../SearchInput/index";
import { SelectedValue } from '../Select/SelectedValue';
import { siteConfig } from '@/config/site.config';
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
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const optionsRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [filteredOptions]);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;

      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;

      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (focusedIndex >= 0 && optionsRef.current) {
      const focusedElement = optionsRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        });

        focusedElement.focus();
      }
    }
  }, [focusedIndex]);

  const handleOptionClick = (option: Currency) => {
    handleSelect(option);
  };

  const handleOptionMouseEnter = (index: number) => {
    setFocusedIndex(index);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(0);
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={modalRef}
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Select currency</h3>
          <p className={styles.modalSubtitle}>
            {siteConfig.selectModalTitle}
          </p>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search currencies..."
            onKeyDown={handleSearchKeyDown}
          />
        </div>

        <div
          className={styles.optionsList}
          ref={optionsRef}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={option.code}
                className={`${styles.option} ${
                  value.code === option.code ? styles.selected : ''
                  } ${index === focusedIndex ? styles.focused : ''}`}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => handleOptionMouseEnter(index)}
                tabIndex={index === focusedIndex ? 0 : -1}
                aria-selected={value.code === option.code || index === focusedIndex}
                role="option"
              >
                <SelectedValue value={option} />
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
  );
};

export default SelectModal;