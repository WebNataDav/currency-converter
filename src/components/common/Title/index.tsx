import { ReactNode, ElementType } from 'react';
import styles from './styles.module.scss';

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: ReactNode;
}

export const Title: React.FC<TitleProps> = ({
  level = 1,
  className = '',
  children
}) => {
  const Tag = `h${level}` as ElementType;

  const titleClass = `${styles.title} ${styles[`title--h${level}`]} ${className}`;

  return (
    <Tag className={titleClass}>
      {children}
    </Tag>
  );
};