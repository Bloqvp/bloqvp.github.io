export interface Profile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
}

export type LucideIconName =
  | 'Globe'
  | 'Github'
  | 'Linkedin'
  | 'Twitter'
  | 'Instagram'
  | 'Youtube'
  | 'Mail'
  | 'Phone'
  | 'MessageCircle'
  | 'ShoppingBag'
  | 'BookOpen'
  | 'Briefcase'
  | 'Coffee'
  | 'Link'
  | 'ExternalLink'
  | 'Rss'
  | 'Play'
  | 'Music'
  | 'Camera'
  | 'Code'
  | 'FileText'
  | 'Twitch'
  | 'Send';

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon: LucideIconName;
  ariaLabel?: string;
  highlighted?: boolean;
}

export interface Theme {
  primaryColor: string;
  backgroundColor: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonBorderRadius?: string;
}

export interface Meta {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  twitterHandle?: string;
}

export interface SocialLink {
  id: string;
  url: string;
  icon: LucideIconName;
  ariaLabel: string;
}

export interface SiteConfig {
  profile: Profile;
  links: LinkItem[];
  socialLinks?: SocialLink[];
  theme: Theme;
  meta: Meta;
}
