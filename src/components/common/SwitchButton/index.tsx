//import React from 'react';
import { IoSwapHorizontal } from 'react-icons/io5';
import styles from './styles.module.scss';

interface SwitchButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export const SwitchButton: React.FC<SwitchButtonProps> = ({
  onClick,
  className = '',
  ariaLabel = 'Swap currencies'
}) => {
  return (
    <button
      className={`${styles.switchButton} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <IoSwapHorizontal size={20} />
    </button>
  );
};