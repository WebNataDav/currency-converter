import { Title } from './index';
import { siteConfig } from '../../../config/site.config';

export const SubTitle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Title level={2} className={`sub-title ${className}`}>
    {siteConfig.subTitle}
  </Title>
);