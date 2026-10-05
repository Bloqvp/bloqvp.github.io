import type { SiteConfig } from './types';

const WHATSAPP_NUMBER = '5561996976559';
const WHATSAPP_MESSAGE = 'Olá! Vim pelo Instagram e quero saber mais sobre as aulas da BLOQ.';

const siteConfig: SiteConfig = {
  profile: {
    name: 'BLOQ Vôlei de Praia',
    handle: 'bloqvp',
    bio: 'Escola de vôlei de praia para todos os níveis.',
    avatarUrl: `${import.meta.env.BASE_URL}avatar.jpg`,
    logoUrl: `${import.meta.env.BASE_URL}logo-mark.png`,
    since: '2002',
    units: ['AABB', 'Águas Claras', 'ARCEF'],
  },

  links: [
    {
      id: 'whatsapp',
      title: 'Fale com a gente',
      subtitle: 'Matrículas e aula experimental',
      url: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
      icon: 'Whatsapp',
      ariaLabel: 'Falar com a BLOQ pelo WhatsApp',
      highlighted: true,
    },
    {
      id: 'instagram',
      title: 'Instagram',
      subtitle: '@bloqvp',
      url: 'https://instagram.com/bloqvp',
      icon: 'Instagram',
      ariaLabel: 'Instagram da BLOQ Vôlei de Praia',
    },
    {
      id: 'website',
      title: 'Site oficial',
      subtitle: 'bloqvp.vercel.app',
      url: 'https://bloqvp.vercel.app/',
      icon: 'Globe',
      ariaLabel: 'Site oficial da BLOQ Vôlei de Praia',
    },
  ],

  theme: {
    primaryColor: '#D4FF00',
    backgroundColor: '#0647BF',
    buttonColor: '#0B3DB5',
    buttonTextColor: '#ffffff',
    buttonBorderRadius: '18px',
  },

  meta: {
    title: 'BLOQ Vôlei de Praia — Links',
    description:
      'Escola de vôlei de praia desde 2002. Unidades AABB, Águas Claras e ARCEF. Fale com a gente pelo WhatsApp.',
    canonicalUrl: 'https://italosoousa.github.io/linktree/',
    ogImage: 'https://italosoousa.github.io/linktree/og-image.jpg',
    twitterHandle: '@bloqvp',
  },
};

export default siteConfig;
