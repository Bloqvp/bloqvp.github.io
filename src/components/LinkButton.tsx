import { ArrowUpRight, Globe, Instagram, type LucideProps } from 'lucide-react';
import type { IconName, LinkItem } from '../types';

type IconComponent = React.ComponentType<LucideProps>;

function Whatsapp({ size = 24, ...props }: LucideProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.43 9.43 0 0 1-4.8-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.45-9.43a9.38 9.38 0 0 1 6.68 2.77 9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.45 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.68 12.06c0 2 .52 3.96 1.52 5.68L.58 23.7l6.1-1.6a11.35 11.35 0 0 0 5.37 1.37h.01c6.27 0 11.37-5.1 11.37-11.37 0-3.04-1.18-5.89-3.33-8.04" />
    </svg>
  );
}

const ICON_MAP: Record<IconName, IconComponent> = {
  Whatsapp,
  Instagram,
  Globe,
};

interface LinkButtonProps {
  link: LinkItem;
}

export default function LinkButton({ link }: LinkButtonProps) {
  const Icon = ICON_MAP[link.icon];
  const ariaLabel = link.ariaLabel ?? link.title;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`link-btn${link.highlighted ? ' link-btn--highlighted' : ''}`}
    >
      <span className="link-btn__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.9} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="link-btn__title">{link.title}</span>
        {link.subtitle && <span className="link-btn__subtitle">{link.subtitle}</span>}
      </span>
      <ArrowUpRight className="link-btn__arrow" size={20} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
