import styles from './styles.module.scss';

interface InputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  className = '',
  disabled = false
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (/^[0-9,.]*$/.test(inputValue) || inputValue === '') {
      onChange(inputValue);
    }
  };

  const handleBlur = () => {
    if (value) {
      const formattedValue = value.replace(',', '.');
      onChange(formattedValue);
    }
  };

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
        inputMode="decimal"
      />
    </div>
  );
};

export default Input;