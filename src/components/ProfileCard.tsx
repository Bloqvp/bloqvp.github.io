import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center gap-4 text-center"
    >
      {avatarError ? (
        <div
          aria-label={`Foto de perfil de ${profile.name}`}
          className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-semibold sm:h-28 sm:w-28"
          style={{
            backgroundColor: 'var(--color-btn)',
            color: 'var(--color-primary)',
            border: '3px solid var(--color-primary)',
          }}
        >
          {getInitials(profile.name)}
        </div>
      ) : (
        <img
          src={profile.avatarUrl}
          alt={profile.name}
          width={96}
          height={96}
          onError={() => setAvatarError(true)}
          className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
          style={{ border: '3px solid var(--color-primary)' }}
        />
      )}

      <div className="flex flex-col gap-1">
        <h1
          className="text-2xl font-semibold leading-snug"
          style={{ color: 'var(--color-text)', letterSpacing: '-0.6px' }}
        >
          {profile.name}
        </h1>

        <p
          className="text-sm font-medium"
          style={{ color: 'var(--color-primary)' }}
        >
          @{profile.handle}
        </p>

        <p
          className="mt-1 max-w-xs text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {profile.bio}
        </p>
      </div>
    </motion.div>
  );
}
