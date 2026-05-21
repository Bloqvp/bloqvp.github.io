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
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

export default function LinkList({ links }: LinkListProps) {
  if (links.length === 0) return null;

  return (
    <motion.ul
      variants={container}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-3"
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
