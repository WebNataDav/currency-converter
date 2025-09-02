import { useState } from 'react';
import { Currency } from '@/types';
import SelectModal from '../SelectModal/index';
import { SelectedValue } from './SelectedValue';

import styles from './styles.module.scss';

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

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.selectTrigger}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SelectedValue value={value} />
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