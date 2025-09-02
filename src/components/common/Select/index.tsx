import { useState } from 'react';
import { Currency } from '@/types';

import styles from './styles.module.scss';
import SelectModal from '../SelectModal/index';


interface SelectProps {
  label: string;
  value: Currency | null;
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

  console.log('val', value)

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.selectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.selectedValue}>
          <span className={styles.currencySymbol}>{value.symbol}</span>
          <div className={styles.currencyValues}>
            <span className={styles.currencyCode}>{value.code}</span>
            <span className={styles.currencyName}>{value.name}</span>
          </div>
        </div>
      </div>

      {isOpen && (
        <SelectModal
          searchTerm={searchTerm}
          setIsOpen={setIsOpen}
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          setSearchTerm={setSearchTerm}
          value={value}
        />
      )}
    </div>
  );
};

export default Select;