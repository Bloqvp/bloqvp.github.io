import siteConfig from './config';
import ProfileCard from './components/ProfileCard';
import LinkList from './components/LinkList';
import SeoHead from './components/SeoHead';

export default function App() {
  return (
    <>
      <SeoHead
        profile={siteConfig.profile}
        meta={siteConfig.meta}
        links={siteConfig.links}
      />

      <div className="page-bg" aria-hidden="true" />

      <div className="relative flex min-h-dvh w-full justify-center px-5 pt-12 pb-8 sm:pt-16">
        <main className="flex w-full max-w-[440px] flex-col gap-9">
          <ProfileCard profile={siteConfig.profile} />
          <LinkList links={siteConfig.links} />
          <footer className="mt-auto pt-4 text-center text-xs text-white/45">
            © {new Date().getFullYear()} {siteConfig.profile.name}
          </footer>
        </main>
      </div>
    </>
  );
}
