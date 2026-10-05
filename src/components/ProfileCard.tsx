import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { Profile } from '../types';

interface ProfileCardProps {
  profile: Profile;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  const [logoError, setLogoError] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center text-center"
    >
      {profile.logoUrl && !logoError ? (
        <img
          src={profile.logoUrl}
          alt={profile.name}
          width={900}
          height={764}
          onError={() => setLogoError(true)}
          className="logo-mark w-64 select-none sm:w-72"
          draggable={false}
        />
      ) : (
        <h1 className="font-display text-5xl font-bold italic uppercase">{profile.name}</h1>
      )}

      {profile.since && (
        <span className="since-badge mt-6">Desde {profile.since}</span>
      )}

      <p className="mt-4 max-w-xs text-balance text-[15px] leading-relaxed text-white/80">{profile.bio}</p>

      {profile.units && profile.units.length > 0 && (
        <ul className="mt-4 flex flex-wrap justify-center gap-2" aria-label="Unidades">
          {profile.units.map((unit) => (
            <li key={unit} className="unit-chip">
              <MapPin size={13} strokeWidth={2.25} aria-hidden="true" />
              {unit}
            </li>
          ))}
        </ul>
      )}
    </motion.header>
  );
}
