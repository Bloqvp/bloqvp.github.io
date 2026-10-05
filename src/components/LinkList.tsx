import { motion } from 'framer-motion';
import LinkButton from './LinkButton';
import type { LinkItem } from '../types';

interface LinkListProps {
  links: LinkItem[];
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.35,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

export default function LinkList({ links }: LinkListProps) {
  if (links.length === 0) return null;

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-3.5"
      aria-label="Lista de links"
    >
      {links.map((link) => (
        <motion.li key={link.id} variants={item}>
          <LinkButton link={link} />
        </motion.li>
      ))}
    </motion.ul>
  );
}
