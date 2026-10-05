export interface Profile {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  logoUrl?: string;
  since?: string;
  units?: string[];
}

export type IconName = 'Whatsapp' | 'Instagram' | 'Globe';

export interface LinkItem {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  icon: IconName;
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

export interface SiteConfig {
  profile: Profile;
  links: LinkItem[];
  theme: Theme;
  meta: Meta;
}
