import { MainTitle } from '../common/Title/MainTitle';
import { SubTitle } from '../common/Title/SubTitle';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <MainTitle />
      <SubTitle />
    </header>
  )
};

export default Header;