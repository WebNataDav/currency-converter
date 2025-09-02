import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Currency } from '@/types';

interface SelectProps {
  label: string;
  value: Currency;
  options: Currency[];
  onChange: (currency: Currency) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (currency: Currency) => {
    onChange(currency);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.selectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedValue}>
          <span className={styles.currencyCode}>{value.code}</span>
          <span className={styles.currencyName}>{value.name}</span>
        </div>
      </div>

      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Select currency</h3>
              <p className={styles.modalSubtitle}>
                Choose a currency from the list below or use the search bar to find a specific currency..
              </p>

              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Search currencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  autoFocus
                />
              </div>
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
      )}
    </div>
  );
};

export default Select;