import { useEffect } from 'react';
import type { Profile, Meta, LinkItem } from '../types';

interface SeoHeadProps {
  profile: Profile;
  meta: Meta;
  links: LinkItem[];
}

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? 'name' : 'property';
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setJsonLd(data: object) {
  let el = document.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"]',
  );
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SeoHead({ profile, meta, links }: SeoHeadProps) {
  useEffect(() => {
    const ogImage = meta.ogImage ?? profile.avatarUrl;

    document.title = meta.title;

    const canonicalLink =
      document.querySelector<HTMLLinkElement>('link[rel="canonical"]') ??
      (() => {
        const el = document.createElement('link');
        el.rel = 'canonical';
        document.head.appendChild(el);
        return el;
      })();
    canonicalLink.href = meta.canonicalUrl;

    setMeta('description', meta.description, true);

    // Open Graph
    setMeta('og:type', 'website');
    setMeta('og:title', meta.title);
    setMeta('og:description', meta.description);
    setMeta('og:url', meta.canonicalUrl);
    setMeta('og:image', ogImage);
    setMeta('og:locale', 'pt_BR');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image', true);
    setMeta('twitter:title', meta.title, true);
    setMeta('twitter:description', meta.description, true);
    setMeta('twitter:image', meta.ogImage ?? profile.avatarUrl, true);
    if (meta.twitterHandle) {
      setMeta('twitter:site', meta.twitterHandle, true);
    }

    // JSON-LD Person schema
    const socialUrls = links
      .filter((link) =>
        ['Github', 'Linkedin', 'Twitter', 'Instagram', 'Youtube', 'Twitch'].includes(
          link.icon,
        ),
      )
      .map((link) => link.url);

    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: profile.name,
      description: profile.bio,
      url: meta.canonicalUrl,
      image: ogImage,
      sameAs: socialUrls,
    });
  }, [profile, meta, links]);

  return null;
}
