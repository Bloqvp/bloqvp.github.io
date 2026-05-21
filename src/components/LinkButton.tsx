import {
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MessageCircle,
  ShoppingBag,
  BookOpen,
  Briefcase,
  Coffee,
  Link,
  ExternalLink,
  Rss,
  Play,
  Music,
  Camera,
  Code,
  FileText,
  Twitch,
  Send,
  type LucideProps,
} from 'lucide-react';
import type { LinkItem, LucideIconName } from '../types';

type IconComponent = React.ComponentType<LucideProps>;

const ICON_MAP: Record<LucideIconName, IconComponent> = {
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MessageCircle,
  ShoppingBag,
  BookOpen,
  Briefcase,
  Coffee,
  Link,
  ExternalLink,
  Rss,
  Play,
  Music,
  Camera,
  Code,
  FileText,
  Twitch,
  Send,
};

interface LinkButtonProps {
  link: LinkItem;
}

export default function LinkButton({ link }: LinkButtonProps) {
  const Icon = ICON_MAP[link.icon];
  const ariaLabel = link.ariaLabel ?? `${link.title} link`;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`link-btn${link.highlighted ? ' link-btn--highlighted' : ''}`}
    >
      <Icon size={20} aria-hidden="true" strokeWidth={1.75} />
      <span>{link.title}</span>
    </a>
  );
}
