import type { SiteConfig } from './types';

const siteConfig: SiteConfig = {
  profile: {
    name: 'Italo Sousa',
    handle: 'italosousa',
    bio: 'Dev & criador de conteúdo. Construindo coisas na web.',
    avatarUrl: '/avatar.jpg',
  },

  links: [
    {
      id: 'portfolio',
      title: 'Meu Portfolio',
      url: 'https://italosousa.dev',
      icon: 'Globe',
      highlighted: true,
    },
    {
      id: 'github',
      title: 'GitHub',
      url: 'https://github.com/italosousa',
      icon: 'Github',
    },
    {
      id: 'linkedin',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/italosousa',
      icon: 'Linkedin',
    },
    {
      id: 'youtube',
      title: 'YouTube — Dev na Prática',
      url: 'https://youtube.com/@italosousa',
      icon: 'Youtube',
    },
    {
      id: 'whatsapp',
      title: 'Fale comigo no WhatsApp',
      url: 'https://wa.me/5511999999999',
      icon: 'MessageCircle',
      ariaLabel: 'Enviar mensagem via WhatsApp',
    },
    {
      id: 'newsletter',
      title: 'Newsletter Semanal',
      url: 'https://italosousa.dev/newsletter',
      icon: 'Mail',
    },
  ],

  socialLinks: [
    {
      id: 'social-github',
      url: 'https://github.com/italosousa',
      icon: 'Github',
      ariaLabel: 'GitHub de Italo Sousa',
    },
    {
      id: 'social-linkedin',
      url: 'https://linkedin.com/in/italosousa',
      icon: 'Linkedin',
      ariaLabel: 'LinkedIn de Italo Sousa',
    },
    {
      id: 'social-youtube',
      url: 'https://youtube.com/@italosousa',
      icon: 'Youtube',
      ariaLabel: 'YouTube de Italo Sousa',
    },
    {
      id: 'social-instagram',
      url: 'https://instagram.com/italosousa',
      icon: 'Instagram',
      ariaLabel: 'Instagram de Italo Sousa',
    },
  ],

  theme: {
    primaryColor: '#5e6ad2',
    backgroundColor: '#010102',
    buttonColor: '#0f1011',
    buttonTextColor: '#f7f8f8',
    buttonBorderRadius: '8px',
  },

  meta: {
    title: 'Italo Sousa — Links',
    description:
      'Dev & criador de conteúdo. Todos os meus links em um só lugar — portfolio, GitHub, YouTube e mais.',
    canonicalUrl: 'https://italosousa.dev/links',
    ogImage: 'https://italosousa.dev/og-image.jpg',
    twitterHandle: '@italosousa',
  },
};

export default siteConfig;
