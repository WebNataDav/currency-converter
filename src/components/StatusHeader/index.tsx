import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useExchangeRates } from '@/hooks/useExchangeRates';

import { FaWifi, FaRegClock, FaRedo, FaBan } from 'react-icons/fa';
import styles from './styles.module.scss';

interface StatusHeaderProps {
  onRefresh?: () => void;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({ onRefresh }) => {
  const { isOnline } = useNetworkStatus();
  const { rates, loading, refreshRates } = useExchangeRates();

  const lastUpdated = rates?.date ? new Date(rates.date) : null;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleRefresh = () => {
    if (onRefresh && !loading) {
      onRefresh();
    }
  };

  return (
    <div className={styles.statusHeader}>
      <div className={styles.statusSection}>
        <div className={`${styles.statusIndicator} ${isOnline ? styles.online : styles.offline}`}>
          <div >
            {isOnline ? (
              <FaWifi
                size={12}
                className={`${styles.statusIcon} ${styles.online}`}
              />
            ) : (
                <FaBan
                  size={12}
                  className={`${styles.statusIcon} ${styles.offline}`}
                />
              )}
          </div>

          <span className={`${styles.statusText} ${isOnline ? styles.online : styles.offline}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>


      <div className={styles.infoSection}>
        {lastUpdated ? (
          <span className={styles.lastUpdated}>
            <FaRegClock size={10} className={styles.clockIcon} />
            Last updated: {formatDate(lastUpdated)}, {formatTime(lastUpdated)}
          </span>
        ) : (
            <span className={styles.lastUpdated}>
              <FaRegClock size={10} className={styles.clockIcon} />
              No data available
          </span>
          )}
      </div>

      <div className={styles.actionsSection}>
        <button
          className={styles.refreshButton}
          onClick={handleRefresh}
          disabled={loading || !isOnline}
          aria-label="Refresh exchange rates"
        >
          <FaRedo size={10} className={styles.refreshSpinner} />
          {loading ? 'Refreshing...' : 'Refresh rates'}
        </button>
      </div>
    </div >
  );
};