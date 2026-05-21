import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Globe,
  Mail,
  type LucideProps,
} from 'lucide-react';
import type { SocialLink, LucideIconName } from '../types';

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Partial<Record<LucideIconName, IconComponent>> = {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Globe,
  Mail,
};

interface SocialIconsProps {
  links: SocialLink[];
}

export default function SocialIcons({ links }: SocialIconsProps) {
  if (links.length === 0) return null;

  return (
    <div className="social-icons" role="list" aria-label="Redes sociais">
      {links.map((link) => {
        const Icon = ICON_MAP[link.icon];
        if (!Icon) return null;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel}
            role="listitem"
            className="social-icon-btn"
          >
            <Icon size={18} aria-hidden="true" strokeWidth={1.75} />
          </a>
        );
      })}
    </div>
  );
}
