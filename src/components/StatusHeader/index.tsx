import { useState, useCallback } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { FaWifi, FaRegClock, FaRedo, FaBan } from 'react-icons/fa';
import { debounce } from '@/utils/debounce';
import { formatDate } from '@/utils/index';
import { formatTime } from '@/utils/index';
import styles from './styles.module.scss';

interface StatusHeaderProps {
  onRefresh?: () => void;
}

export const StatusHeader: React.FC<StatusHeaderProps> = ({ onRefresh }) => {
  const { isOnline } = useNetworkStatus();
  const { rates, loading, refreshRates } = useExchangeRates();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const lastUpdated = rates?.date ? new Date(rates.date) : null;

  const debouncedRefresh = useCallback(
    debounce(async () => {
      setIsRefreshing(true);
      try {
        if (onRefresh) {
          await onRefresh();
        } else {
          await refreshRates();
        }
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }, 1000),
    [onRefresh, refreshRates]
  );

  const handleRefresh = () => {
    if ((loading || isRefreshing) || !isOnline) return;
    debouncedRefresh();
  };

  const showLoading = loading || isRefreshing;

  return (
    <div className={styles.statusHeader}>
      <div className={styles.statusSection}>
        <div className={`${styles.statusIndicator} ${isOnline ? styles.online : styles.offline}`}>
          <div>
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
            {!isOnline && ' • Using cached rates'}
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
          disabled={showLoading || !isOnline}
          aria-label="Refresh exchange rates"
        >
          <FaRedo size={10} className={styles.refreshSpinner} />
          {loading ? 'Refreshing...' : 'Refresh rates'}
        </button>
      </div>
    </div>
  );
};