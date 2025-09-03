import { Title } from './index';
import { siteConfig } from '../../../config/site.config';

export const MainTitle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Title level={1} className={`main-title ${className}`}>
    {siteConfig.title}
  </Title>
);