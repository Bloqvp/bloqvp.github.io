import siteConfig from './config';
import ProfileCard from './components/ProfileCard';
import LinkList from './components/LinkList';
import SocialIcons from './components/SocialIcons';
import SeoHead from './components/SeoHead';

export default function App() {
  return (
    <>
      <SeoHead
        profile={siteConfig.profile}
        meta={siteConfig.meta}
        links={siteConfig.links}
      />

      <div
        className="flex min-h-dvh w-full justify-center px-6 py-12"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <main className="flex w-full max-w-[448px] flex-col gap-8">
          <ProfileCard profile={siteConfig.profile} />
          <LinkList links={siteConfig.links} />
          {siteConfig.socialLinks && siteConfig.socialLinks.length > 0 && (
            <SocialIcons links={siteConfig.socialLinks} />
          )}
        </main>
      </div>
    </>
  );
}
