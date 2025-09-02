import { Currency } from '@/types';
import styles from './styles.module.scss';

interface SelectedValueProps {
  value: Currency | null;
}

export const SelectedValue: React.FC<SelectedValueProps> = ({ value }) => {
  return (
    <div className={styles.selectedValue}>
      <span className={styles.currencySymbol}>{value.symbol}</span>
      <div className={styles.currencyValues}>
        <span className={styles.currencyCode}>{value.code}</span>
        <span className={styles.currencyName}>{value.name}</span>
      </div>
    </div>
  )
}